const express = require('express');
const router = express.Router();
const { sessionChecker } = require('../middlewares/isAuth');
const { createBasket, addProductToBasket, deleteProductFromBasket } = require('../controllers/basketControllers');

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
router.delete('/:basketId', sessionChecker, deleteProductFromBasket);

module.exports = router;
