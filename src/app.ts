import express, { Express, Request, Response, NextFunction } from 'express';
import authorRouter from './resources/authors/author.router';
import courseRouter from './resources/courses/courses.router';

const app: Express = express();

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/authors', authorRouter);
app.use('/courses', courseRouter);

export default app;
