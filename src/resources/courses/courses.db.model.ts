import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface CourseType {
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: [string];
  _id?: string;
  id?: string;
}

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
