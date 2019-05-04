const models = require('../models/index');

const { validateSchema } = require('../utils/validation/validateSchema');
const { productSchema } = require('../schemas/product');

// CREATE PRODUCT CONTROLLER
exports.createProduct = (req, res) => {
  // get the data sent by the user
  const newProduct = req.body;

  // validate the data sent by the user
  const validateProduct = validateSchema(newProduct, productSchema);

  // if the data has a valid format, create a new product
  if (validateProduct.isValid) {
    models.Product
      .create(newProduct)
      .then(product => { // product is the response from the db
        // returning a json containing the product
        res.json({ success: true, product });
      });
  }

  // if the data has an invalid format, send the errors
  if (!validateProduct.isValid) {
    return res.json({
      errors: validateProduct.errors
    });
  }
};

// UPDATE PRODUCT CONTROLLER
exports.updateProduct = (req, res) => {
  const idOfTheProductToUpdate = req.params.productId;
  const newProductValues = req.body;
  models.Product.update(newProductValues, {
    where: {
      id: idOfTheProductToUpdate
    }
  }).then(_product => {
    res.json({
      success: true
    });
  });
};

// UPDATE PRODUCT CONTROLLER
exports.deleteProduct = (req, res) => {
  const idOfTheProductDelete = req.params.productId;
  models.Product.destroy({
    where: {
      id: idOfTheProductDelete
    }
  }).then(_product => {
    res.json({
      success: true,
      productDeleted: idOfTheProductDelete
    });
  });
};

// GET PRODUCT CONTROLLER
exports.getProduct = (req, res) => {
  const idOfTheProductToFindOne = req.params.productId;
  models.Product.findOne({
    where: {
      id: idOfTheProductToFindOne
    },
    raw: true
  }).then(product => {
    res.json({
      success: true,
      product
    });
  });
};

// GET ALL PRODUCTS CONTROLLER
exports.getAllProducts = (req, res) => {
  const { categoryName } = req.params;
  models.Product.findAll({ where: { category: categoryName } })
    .then(products => {
      res.json({
        success: true,
        products
      });
    });
};
