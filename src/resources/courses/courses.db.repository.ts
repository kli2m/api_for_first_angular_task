import { Course } from './courses.db.model';
import CourseType from '../../interfaces/course';

const getAll = async () => await Course.find({});

const get = async (id: string) => await Course.findById({ _id: id });

const create = async (course: CourseType) => await Course.create(course);

const put = async (id: string, course: CourseType) =>
  await Course.findByIdAndUpdate({ _id: id }, course);

const del = async (id: string) => await Course.deleteOne({ _id: id });

export default {
  getAll,
  get,
  create,
  put,
  del,
};
