const models = require('../models/index');

// CREATE BASKET CONTROLLER
exports.createBasket = (req, res) => {
  // new basket contains: name, userId
  const newBasket = req.body;
  models.Basket
    .create(newBasket)
    .then(basket => {
      res.json({
        success: true,
        basket
      });
    });
};

// DELETE BASKET CONTROLLER
exports.deleteBasket = (req, res) => {
  const { basketId } = req.body;
  // Delete cascade the relations between the dressing and the products first
  models.BasketCourse.destroy({
    where: {
      basketId
    }
    // then delete the dressing itself
  }).then(() => models.Basket.destroy({
    where: {
      id: basketId
    }
  })).then(basket => {
    res.json({
      success: true,
      basketDeleted: basket
    });
  });
};

// ADD PRODUCT TO BASKET CONTROLLER
exports.addProductToBasket = async (req, res) => {
  // eg: { basketId: 1, productId: 8 } -> in data
  const { courseId, basketId } = req.body;
  await models.BasketCourse.findAll({
    where: {
      courseId,
      basketId
    },
    raw: true
  }).then(basketCourses => {
    if (basketCourses.length > 0) {
      return res.json({ success: false });
    }
    return models.BasketCourse
      .create({ courseId, basketId })
      .then(basketCourse => {
        res.json({ success: true, basketCourse });
      });
  });
};

// DELETE PRODUCT FROM BASKET CONTROLLER
exports.deleteProductFromBasket = (req, res) => {
  const { courseId, basketId } = req.body;

  models.BasketCourse.destroy({
    where: {
      courseId,
      basketId
    }
  }).then(course => {
    res.json({
      success: true,
      courseDeleted: course
    });
  });
};

// GET PRODUCTS FROM BASKET CONTROLLER
exports.getProductsFromBasket = (req, res) => {
  const { basketId } = req.params;

  models.db.query(
    `SELECT * FROM "BasketCourses"
    INNER JOIN "Courses"
    ON "BasketCourses".course_id = "Courses".id
    WHERE basket_id = :basket_id `, {
      replacements: { basket_id: basketId },
      type: models.db.QueryTypes.SELECT
    }).then(courses => {
    res.json({ success: true, courses });
  });
};

// GET BASKETS
exports.getUserBaskets = (req, res) => {
  const { userId } = req.params;

  models.Basket.findAll({
    where: {
      userId
    },
    raw: true
  }).then(baskets => res.json({
    success: true, baskets
  }));
};
