module.exports = (db, DataTypes) => {
  const Basket = db.define('Basket', {
    name: DataTypes.STRING
  });

  Basket.associate = (models) => {
    Basket.belongsToMany(models.Product, {
      through: 'BasketProduct',
      foreignKey: { name: 'basketId', field: 'basket_id' }
    });
    Basket.belongsTo(models.User, {
      foreignKey: { name: 'userId', field: 'user_id' }
    });
  };

  return Basket;
};
