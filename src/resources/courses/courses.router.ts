import routerExpress, { Request, Response } from 'express';
import { Course, toResponse } from './courses.db.model';
import coursesService from './courses.service';

const router = routerExpress.Router({ mergeParams: true });

router.route('/').get(async (_: Request, res: Response) => {
  try {
    const courses = await coursesService.getAll();
    if (courses) res.json(courses.map(toResponse));
    else res.status(404).send('Courses is not found');
  } catch (error) {
    res.status(404).send('Could not find courses');
  }
});

router.route('/:courseId').get(async (req: Request, res: Response) => {
  try {
    const courseId = req.params['courseId'];
    if (courseId) {
      const course = await coursesService.get(courseId);
      if (course) {
        res.json(toResponse(course));
      } else new Error();
    } else res.status(404).send(`CourseId=${req.params['courseId']} not found`);
  } catch (error) {
    res.status(404).send(`CourseId=${req.params['courseId']} not found`);
  }
});

router.route('/').post(async (req: Request, res: Response) => {
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

router.route('/:courseId').put(async (req: Request, res: Response) => {
  try {
    const courseId = req.params['courseId'];
    if (courseId) {
      await coursesService.put(courseId, req.body);
      const newCourse = await coursesService.get(courseId);
      if (newCourse) {
        res.json(toResponse(newCourse));
      } else new Error();
    } else res.status(404).send(`CourseId=${req.params['courseId']} not found`);
  } catch (error) {
    res.status(404).send(`CourseId=${req.params['courseId']} not found`);
  }
});

router.route('/:courseId').delete(async (req: Request, res: Response) => {
  try {
    const courseId = req.params['courseId'];
    if (courseId) {
      await coursesService.del(courseId);
      res.status(204).send(`CourseId=${courseId} has been deleted`);
    } else new Error();
  } catch (error) {
    res.status(404).send(`CourseId=${req.params['courseId']} not found`);
  }
});

export default router;
