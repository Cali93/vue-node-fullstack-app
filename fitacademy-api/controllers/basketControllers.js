const models = require('../models/index');

// CREATE BASKET CONTROLLER
exports.createBasket = (req, res) => {
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

// ADD PRODUCT TO BASKET CONTROLLER
exports.addProductToBasket = (req, res) => {
  // eg: { basketId: 1, productId: 8 } -> in data
  const { courseId, basketId } = req.body;
  models.BasketCourse
    .create({ courseId, basketId })
    .then(basketCourse => {
      res.json({ success: true, basketCourse });
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
