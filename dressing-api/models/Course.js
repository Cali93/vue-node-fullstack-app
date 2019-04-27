module.exports = (db, DataTypes) => {
  const Course = db.define('Course', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    programme: DataTypes.STRING,
    date: DataTypes.DATE
  });

  Course.associate = (models) => {
    Course.belongsToMany(models.Basket, {
      through: 'BasketCourse',
      foreignKey: { name: 'courseId', field: 'course_id' }
    });
    // Course.hasMany(models.Course, { through: 'Basket_Course' });
  };

  return Course;
};
