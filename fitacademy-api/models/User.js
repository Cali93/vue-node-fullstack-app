const bcrypt = require('bcryptjs');

module.exports = (db, DataTypes) => {
  const User = db.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: 'The username can only contain letters and numbers'
        },
        len: {
          args: [3, 25],
          msg: 'The username must contain between 3 and 25 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      validate: {
        len: {
          args: [6, 25],
          msg: 'The password must contain between 6 and 25 characters'
        }
      }
    }
  }, {
    hooks: {
      afterValidate: async (user) => {
        if (user.password) {
          const hashedPassword = await bcrypt.hash(user.password, 12);
          user.password = hashedPassword;
        }
      }
    }
  });

  return User;
};
