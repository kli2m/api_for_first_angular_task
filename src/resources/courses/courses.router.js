const router = require('express').Router({ mergeParams: true });
const { Course, toResponse } = require('./courses.db.model');
const coursesService = require('./courses.service');

router.route('/').get(async (req, res) => {
  try {
    const { courseId } = req.params;
    const courses = await coursesService.getAll(courseId);
    res.json(courses.map(toResponse));
  } catch (error) {
    res.status(404).send('Could not find courses');
  }
});

router.route('/:courseId').get(async (req, res) => {
  try {
    const course = await coursesService.get(req.params.courseId);
    res.json(toResponse(course));
  } catch (error) {
    res.status(404).send(`CourseId=${req.params.courseId} not found`);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const course = await coursesService.create(
      new Course({
        name: req.body.name,
        surName: req.body.surName,
        title: req.body.title,
        description: req.body.description,
        creationDate: req.body.creationDate,
        duration: req.body.duration,
        authors: req.body.authors,
      }),
    );
    res.json(toResponse(course));
  } catch (error) {
    res.status(404).send(`${error}`);
  }
});

router.route('/:courseId').put(async (req, res) => {
  try {
    await coursesService.put(req.params.courseId, req.body);
    const newCourse = await coursesService.get(req.params.courseId);
    res.json(toResponse(newCourse));
  } catch (error) {
    res.status(404).send(`CourseId=${req.params.courseId} not found`);
  }
});

router.route('/:courseId').delete(async (req, res) => {
  try {
    await coursesService.del(req.params.courseId);
    res.status(204).send(`CourseId=${req.params.courseId} has been deleted`);
  } catch (error) {
    res.status(404).send(`CourseId=${req.params.courseId} not found`);
  }
});

module.exports = router;
