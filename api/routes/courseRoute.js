const express = require('express');
const router = express.Router();
const {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourse,
  getAllCourses
} = require('../controllers/courseController');

// @route POST    /course
// @description   Create a new course
// @access        Public
router.post('/', createCourse);

// @route GET     /course/category/:categoryName
// @description   Get all Courses by category name
// @access        Public
router.get('/category/:categoryName', getAllCourses);

// @route GET     /course/:courseId
// @description   Get a single course by his ID
// @access        Public
router.get('/:courseId', getCourse);

// @route POST    /course/:courseId
// @description   Update a course by his id, the patch method will replace the data
// @access        Public
// if we use the put method it would have deleted our previous course and replaced it by the new one
router.patch('/:courseId', updateCourse);

// @route POST    /course/:courseId
// @description   Delete a course by his id
// @access        Public
router.delete('/:courseId', deleteCourse);

// Exporting the course route so that we can import it in our app.js
module.exports = router;
