module.exports = (db, DataTypes) => {
  const BasketProduct = db.define('BasketProduct', {
    // Relationship table between basket and product
    basketId: {
      field: 'basket_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Baskets',
        key: 'id'
      }
    },
    productId: {
      field: 'product_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    }
  });
  return BasketProduct;
};
