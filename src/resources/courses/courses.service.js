const coursesRepo = require('./courses.db.repository');

const getAll = async () => await coursesRepo.getAll();
const get = async (id) => await coursesRepo.get(id);
const create = async (course) => await coursesRepo.create(course);
const put = async (id, course) => await coursesRepo.put(id, course);
const del = async (id) => await coursesRepo.del(id);

module.exports = {
  getAll,
  get,
  create,
  put,
  del,
};