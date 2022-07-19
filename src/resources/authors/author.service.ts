import authorsRepo from './author.db.repository';
import AuthorType from '../../interfaces/author';

const getAll = async () => await authorsRepo.getAll();
const get = async (id: string) => await authorsRepo.get(id);
const create = async (author: AuthorType) => await authorsRepo.create(author);
const put = async (id: string, author: AuthorType) => await authorsRepo.put(id, author);
const del = async (id: string) => await authorsRepo.del(id);

export default {
  getAll,
  get,
  create,
  put,
  del,
};
