module.exports = (db, DataTypes) => {
  const Product = db.define('Product', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    brand: DataTypes.STRING,
    description: DataTypes.STRING
  });

  Product.associate = (models) => {
    Product.belongsToMany(models.Basket, {
      through: 'BasketProduct',
      foreignKey: { name: 'productId', field: 'product_id' }
    });
  };

  return Product;
};
