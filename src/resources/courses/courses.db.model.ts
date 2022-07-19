import mongoose, { Schema } from 'mongoose';
import CourseType from '../../interfaces/course';
import { v4 as uuidv4 } from 'uuid';

const courseSchema: Schema<CourseType> = new mongoose.Schema(
  {
    title: String,
    description: String,
    creationDate: Date,
    duration: Number,
    authors: [String],
    _id: { type: String, default: () => uuidv4() },
  },
  { versionKey: false },
);

const toResponse = (course: CourseType): CourseType => {
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

export { Course, toResponse };
