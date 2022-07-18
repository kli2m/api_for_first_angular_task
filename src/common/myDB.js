const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');
const { Author } = require('../resources/authors/author.db.model');
const { Course } = require('../resources/courses/courses.db.model');

const AuthorsDB = [
  new Author({
    name: 'name1',
    surName: 'surName1',
  }),
  new Author({
    name: 'name2',
    surName: 'surName2',
  }),
];
console.log('AuthorsDB', AuthorsDB);
const CoursesDB = [
  new Course({
    title: 'title1',
    description: 'description1',
    creationDate: new Date(),
    duration: 3,
    authors: ['authors1', 'authors1'],
  }),
  new Course({
    title: 'title2',
    description: 'description2',
    creationDate: new Date('2000-1-1'),
    duration: 10,
    authors: ['authors2', 'authors2'],
  }),
];
console.log('CoursesDB', CoursesDB);
const connectToDB = (app) => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log("we're connected!");
    await db.dropDatabase();
    await AuthorsDB.forEach(async (author) => await author.save());
    await CoursesDB.forEach(async (course) => await course.save());
    app();
  });
};
module.exports = { AuthorsDB, connectToDB };
