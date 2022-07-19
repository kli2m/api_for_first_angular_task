import coursesRepo from './courses.db.repository';
import CourseType from '../../interfaces/course';

const getAll = async () => await coursesRepo.getAll();
const get = async (id: string) => await coursesRepo.get(id);
const create = async (course: CourseType) => await coursesRepo.create(course);
const put = async (id: string, course: CourseType) => await coursesRepo.put(id, course);
const del = async (id: string) => await coursesRepo.del(id);

export default {
  getAll,
  get,
  create,
  put,
  del,
};
