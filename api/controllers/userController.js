const _ = require('lodash');
const bcrypt = require('bcryptjs');
const models = require('../models/index');

exports.createUser = async (req, res) => {
  const newUser = req.body;
  // using a promise
  return models.User
    .create(newUser, { raw: true })
    .then(user => {
      models.Basket.create({
        name: 'Default basket',
        userId: user.id
      }, { raw: true }).then(basket => {
        return res.json({ success: true,
          user: {
            // spread over the user and omit the password field
            ..._.omit(user.dataValues, ['password'])
          }
        });
      });
    })
    .catch(error => res.json({
      error
    }));
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // using await
    // Check if user already exists
    const user = await models.User.findOne({
      where: { email },
      raw: true
    });

    // If it doesn't exists return false
    if (!user) {
      return res.json({ success: false });
    }

    // check if the password is valid
    const valid = await bcrypt.compare(password, user.password);

    // if the password is invalid return false
    if (!valid) {
      return res.json({ success: false });
    }

    // if everything's ok, append user's id to the req.session
    req.session.userId = user.id;

    // Get user's default basket
    const userBasket = await models.Basket.findOne({
      where: { userId: user.id },
      raw: true
    });

    return res.json({
      success: true,
      user: {
        ..._.omit(user, ['password']),
        basketId: userBasket.id
      }
    });
  } catch (err) {
    return res.json({ success: false });
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: { id: req.session.userId },
      raw: true
    });

    if (!user) {
      return res.json({ success: false });
    }

    const userBasket = await models.Basket.findOne({
      where: { userId: user.id },
      raw: true
    });

    return res.json({
      success: true,
      user: {
        // spread over the user and omit the password field and append the default basket id
        ..._.omit(user, ['password']),
        basketId: userBasket.id
      }
    });
  } catch (err) {
    return res.json({ success: false });
  }
};

exports.updateUser = (req, res) => {
  const { userId, newData } = req.body;
  models.User.update({
    // the spread operator will populate this object with the keys and values of the copied object
    ...newData
  }, {
    where: {
      id: userId
    }
  }).then(updated =>
    res.json({
      success: true,
      user: {
        id: userId,
        ...newData
      }
    })
  );
};

exports.logoutUser = async (req, res) => {
  // destroy the session
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.json({ success: false });
    }
    // remove the cookie
    res.clearCookie('session_id');
    return res.json({ success: true });
  });
};
