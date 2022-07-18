const mongoose = require('mongoose');
const uuid = require('uuid');

const courseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    creationDate: Date,
    duration: Number,
    authors: [String],
    _id: { type: String, default: () => uuid.v4() },
  },
  { versionKey: false },
);

const toResponse = (course) => {
  const { _id, title, description, creationDate, duration, authors } = course;
  return {
    id: _id,
    title,
    description,
    creationDate,
    duration,
    authors,
  };
};

const Course = mongoose.model('Course', courseSchema);

module.exports = { Course, toResponse };
