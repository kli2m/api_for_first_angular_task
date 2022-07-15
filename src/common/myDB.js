const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');
const { Author } = require('../resources/authors/author.db.model');

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
    app();
  });
};
module.exports = { AuthorsDB, connectToDB };
