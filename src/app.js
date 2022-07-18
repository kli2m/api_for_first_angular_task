const express = require('express');
const authorRouter = require('./resources/authors/author.router');
const courseRouter = require('./resources/courses/courses.router');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/author', authorRouter);
app.use('/courses', courseRouter);

module.exports = app;
