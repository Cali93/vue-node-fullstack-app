const Sequelize = require('sequelize');
// Destructuring from the db config object
// instead of const db = require('../config/db')
// And then having to do { database: db.database }
// We can just do as follow
const { database, username, password, dialect, host, port } = require('../config/db');

// Mapping the config values to the Sequelize object properties.
// As the args needed in the Sequelize object are the same as our variables declared above
// We can do some destructuring aswell (eg: instead of having { database: database }, we can do: { database })
const db = new Sequelize(
  database,
  username,
  password,
  {
    dialect,
    host,
    port
  }
);

// Building the models object that we will use in our controllers
// For example, we'll be able to do models.Basket.creat(basket)
const models = {
  Basket: db.import('./Basket'),
  BasketProduct: db.import('./BasketProduct'),
  User: db.import('./User'),
  Product: db.import('./Product')
};

// Looping on each models and checking if the model contains a method called assosiate
// if so, we'll append the models to it so that we can create relations our just use other models
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Appending the db instantiation and the Sequelize object to the models
models.db = db;
models.Sequelize = Sequelize;

// Exporting the models;
module.exports = models;
