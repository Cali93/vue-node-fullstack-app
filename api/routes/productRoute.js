const express = require('express');
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts
} = require('../controllers/productController');

// @route POST    /product
// @description   Create a new product
// @access        Public
router.post('/', createProduct);

// @route GET     /product/category/:categoryName
// @description   Get all Products by category name
// @access        Public
router.get('/category/:categoryName', getAllProducts);

// @route GET     /product/:productId
// @description   Get a single product by his ID
// @access        Public
router.get('/:productId', getProduct);

// @route PATCH   /product/:productId
// @description   Update a product by his id, the patch method will replace the data
// @access        Public
// if we use the put method it would have deleted our previous product and replaced it by the new one
router.patch('/:productId', updateProduct);

// @route DELETE    /product/:productId
// @description   Delete a product by his id
// @access        Public
router.delete('/:productId', deleteProduct);

// Exporting the product route so that we can import it in our app.js
module.exports = router;
