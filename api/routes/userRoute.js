const express = require('express');
const router = express.Router();
const { createUser, loginUser, logoutUser, currentUser, updateUser } = require('../controllers/userController');
const { sessionChecker } = require('../middlewares/isAuth');
// @route POST     users/register
// @description   Register user
// @access        Public
router.post('/register', createUser);

// @route POST     users/login
// @description   Login user // Returning the Cookie
// @access        Public
router.post('/login', loginUser);

// @route GET     users/current
// @description   Return current user
// @access        Private
router.get('/current', currentUser);

// @route GET     users/logout
// @description   Logout user, clear cookie and destroy session
// @access        Private
router.get('/logout', sessionChecker, logoutUser);

// @route UPDATE     users/:userId
// @description   Update username
// @access        Private
router.patch('/:userId', sessionChecker, updateUser);

module.exports = router;
