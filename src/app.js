const express = require('express');
const authorRouter = require('./resources/authors/author.router');

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

module.exports = app;
