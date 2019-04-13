const _ = require('lodash');
const bcrypt = require('bcryptjs');
const models = require('../models/index');

exports.createUser = async (req, res) => {
  const newUser = req.body;
  // using a promise
  models.User
    .create(newUser, { raw: true })
    .then(user => {
      models.Basket.create({
        name: 'Default basket',
        userId: user.id
      }, { raw: true }).then(basket => {
        res.json({ success: true,
          user: {
            // spreading over the user and omitting the password
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
    const user = await models.User.findOne({
      where: { email },
      raw: true
    });

    if (!user) {
      return res.json({ success: false });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.json({ success: false });
    }

    req.session.userId = user.id;

    return res.json({
      success: true,
      user: {
        ..._.omit(user, ['password'])
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
      where: { userId: user.id }
    });

    return res.json({
      success: true,
      user: {
        ..._.omit(user, ['password']),
        userBasketId: userBasket.id
      }
    });
  } catch (err) {
    return res.json({ success: false });
  }
};

exports.logoutUser = async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    res.clearCookie('session_id');
    return res.json({ success: true });
  });
};
