import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import verifyToken from './utils/verifyToken';
import loginRouter from './resources/login/login.router';
import regRouter from './resources/registration/registration.router';
import userRouter from './resources/users/user.router';
import courseRouter from './resources/courses/courses.router';
import authorRouter from './resources/authors/author.router';

const app: Express = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/reg', regRouter);
app.use('/users', verifyToken, userRouter);
app.use('/authors', verifyToken, authorRouter);
app.use('/courses', verifyToken, courseRouter);

export default app;
