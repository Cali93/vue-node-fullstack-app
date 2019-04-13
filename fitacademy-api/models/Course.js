module.exports = (db, DataTypes) => {
  const Course = db.define('Course', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    programme: DataTypes.STRING,
    date: DataTypes.DATE
  });

  Course.associate = (models) => {
    Course.belongsToMany(models.Basket, {
      through: 'Basket_Course',
      as: 'BasketCourse',
      foreignKey: { name: 'courseId', field: 'course_id' }
    });
  };

  return Course;
};
