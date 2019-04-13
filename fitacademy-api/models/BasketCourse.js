module.exports = (db, DataTypes) => {
  const BasketCourse = db.define('BasketCourse', {
    basketId: {
      field: 'basket_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Baskets',
        key: 'id'
      }
    },
    courseId: {
      field: 'course_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Courses',
        key: 'id'
      }
    }
  });
  return BasketCourse;
};
