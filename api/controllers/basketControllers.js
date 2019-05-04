const models = require('../models/index');

// CREATE BASKET CONTROLLER
exports.createBasket = async (req, res) => {
  // new basket eg: {name: 'my custom dressing', userId: 4}
  const newBasket = req.body;
  return models.Basket
    .create(newBasket)
    .then(basket => {
      res.json({
        success: true,
        basket
      });
    });
};

// DELETE BASKET CONTROLLER
exports.deleteBasket = async (req, res) => {
  const { basketId } = req.body;
  // Delete cascade the relations between the dressing and the products first
  return models.BasketProduct.destroy({
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
  // eg: { productId: 8, basketId: 1 }
  const { productId, basketId } = req.body;
  return models.BasketProduct.findAll({
    where: {
      productId,
      basketId
    },
    raw: true
  }).then(basketProducts => {
    // if the product is already in that basket, don't add it
    if (basketProducts.length > 0) {
      return res.json({ success: false });
    }

    // otherwhise create it
    return models.BasketProduct
      .create({ productId, basketId })
      .then(basketProduct => {
        res.json({ success: true, basketProduct });
      });
  });
};

// DELETE PRODUCT FROM BASKET CONTROLLER
exports.deleteProductFromBasket = async (req, res) => {
  const { productId, basketId } = req.body;

  return models.BasketProduct.destroy({
    where: {
      productId,
      basketId
    }
  }).then(product => {
    return res.json({
      success: true,
      productDeleted: productId
    });
  });
};

exports.updateBasket = async (req, res) => {
  const { name, id } = req.body;
  return models.User.update({
    name
  }, {
    where: {
      id
    }
  });
};

// GET PRODUCTS FROM BASKET CONTROLLER
exports.getProductsFromBasket = async (req, res) => {
  const { basketId } = req.params;
  // Sequelize allows us to make plain SQL queries
  // It can be handy for complex queries
  // We are making an inner join of products and baskets through the relationship table BasketProducts
  return models.db.query(
    `SELECT * FROM "BasketProducts"
    INNER JOIN "Products"
    ON "BasketProducts".product_id = "Products".id
    WHERE basket_id = :basket_id`, {
      replacements: { basket_id: basketId },
      type: models.db.QueryTypes.SELECT
    }).then(products => {
    res.json({ success: true, products });
  });
};

// GET BASKETS
exports.getUserBaskets = async (req, res) => {
  const { userId } = req.params;

  return models.Basket.findAll({
    where: {
      userId
    },
    raw: true
  }).then(baskets => res.json({
    success: true, baskets
  }));
};
