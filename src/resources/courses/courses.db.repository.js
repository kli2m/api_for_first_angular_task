const { Course } = require('./courses.db.model');

const getAll = async () => await Course.find({});

const get = async (id) => await Course.findById({ _id: id });

const create = async (course) => await Course.create(course);

const put = async (id, course) => await Course.findByIdAndUpdate({ _id: id }, course);

const del = async (id) => await Course.deleteOne({ _id: id });

module.exports = {
  getAll,
  get,
  create,
  put,
  del,
};
