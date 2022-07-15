const mongoose = require('mongoose');
const uuid = require('uuid');

const authorSchema = new mongoose.Schema(
  {
    name: String,
    surName: String,
    _id: { type: String, default: () => uuid.v4() },
  },
  { versionKey: false },
);

const toResponse = (author) => {
  const { _id, name, surName } = author;
  return { id: _id, name, surName };
};

const Author = mongoose.model('Author', authorSchema);

module.exports = { Author, toResponse };
