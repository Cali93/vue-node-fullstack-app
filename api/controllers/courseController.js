const models = require('../models/index');

const { validateSchema } = require('../utils/validation/validateSchema');
const { courseSchema } = require('../schemas/course');

// CREATE COURSE CONTROLLER
exports.createCourse = (req, res) => {
  // get the data sent by the user
  const newCourse = req.body;

  // validate the data sent by the user
  const validateCourse = validateSchema(newCourse, courseSchema);

  // if the data has a valid format, create a new course
  if (validateCourse.isValid) {
    models.Course
      .create(newCourse)
      .then(course => { // course is the response from the db
        // returning a json containing the course
        res.json({ success: true, course });
      });
  }

  // if the data has an invalid format, send the errors
  if (!validateCourse.isValid) {
    return res.json({
      errors: validateCourse.errors
    });
  }
};

// UPDATE COURSE CONTROLLER
exports.updateCourse = (req, res) => {
  const idOfTheCourseToUpdate = req.params.courseId;
  const newCourseValues = req.body;
  models.Course.update(newCourseValues, {
    where: {
      id: idOfTheCourseToUpdate
    }
  }).then(_course => {
    res.json({
      success: true
    });
  });
};

// UPDATE COURSE CONTROLLER
exports.deleteCourse = (req, res) => {
  const idOfTheCourseDelete = req.params.courseId;
  models.Course.destroy({
    where: {
      id: idOfTheCourseDelete
    }
  }).then(_course => {
    res.json({
      success: true,
      courseDeleted: idOfTheCourseDelete
    });
  });
};

// GET COURSE CONTROLLER
exports.getCourse = (req, res) => {
  const idOfTheCourseToFindOne = req.params.courseId;
  models.Course.findOne({
    where: {
      id: idOfTheCourseToFindOne
    },
    raw: true
  }).then(course => {
    res.json({
      success: true,
      course
    });
  });
};

// GET ALL COURSES CONTROLLER
exports.getAllCourses = (req, res) => {
  const { categoryName } = req.params;
  models.Course.findAll({ where: { type: categoryName } })
    .then(courses => {
      res.json({
        success: true,
        courses
      });
    });
};
