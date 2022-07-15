const authorsRepo = require('./author.db.repository');

const getAll = async () => await authorsRepo.getAll();
const get = async (id) => await authorsRepo.get(id);
const create = async (author) => await authorsRepo.create(author);
const put = async (id, author) => await authorsRepo.put(id, author);
const del = async (id) => await authorsRepo.del(id);

module.exports = {
  getAll,
  get,
  create,
  put,
  del,
};
