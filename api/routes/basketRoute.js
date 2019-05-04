const express = require('express');
const router = express.Router();
const { sessionChecker } = require('../middlewares/isAuth');
const {
  createBasket,
  addProductToBasket,
  deleteProductFromBasket,
  getProductsFromBasket,
  updateBasket
} = require('../controllers/basketControllers');

// @route POST    /basket
// @description   Create a new basket
// @access        Public
router.post('/', createBasket);

// @route POST    /basket/:basketId
// @description   Adds a product to the basket
// @access        Private
router.post('/:basketId', sessionChecker, addProductToBasket);

// @route POST    /basket/:basketId
// @description   Adds a product to the basket
// @access        Private
router.delete('/:basketId', deleteProductFromBasket);

// @route GET    /basket/:basketId
// @description   Adds a product to the basket
// @access        Private
router.get('/:basketId', getProductsFromBasket);

// @route GET    /basket/:basketId
// @description   Adds a product to the basket
// @access        Private
router.patch('/:basketId', updateBasket);

module.exports = router;
