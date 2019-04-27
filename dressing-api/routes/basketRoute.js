const express = require('express');
const router = express.Router();
const { sessionChecker } = require('../middlewares/isAuth');
const {
  createBasket,
  deleteBasket,
  addProductToBasket,
  deleteProductFromBasket,
  getProductsFromBasket,
  getUserBaskets
} = require('../controllers/basketControllers');

// @route POST    /basket
// @description   Create a new basket
// @access        Public
router.post('/', createBasket);

// @route DELETE  /basket
// @description   Delete a basket
// @access        Private
router.delete('/', deleteBasket);

// @route POST    /basket/:basketId
// @description   Adds a product to the basket
// @access        Private
router.post('/:basketId', sessionChecker, addProductToBasket);

// @route DELETE  /basket/:basketId
// @description   Delete a product to the basket
// @access        Private
router.delete('/:basketId', deleteProductFromBasket);

// @route GET    /basket/:basketId
// @description   Gets products from the basket
// @access        Private
router.get('/:basketId', getProductsFromBasket);

// @route GET     /basket/:userId
// @description   Gets user's baskets
// @access        Private
router.get('/user/:userId', getUserBaskets);

module.exports = router;
