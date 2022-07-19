import { Author } from './author.db.model';
import AuthorType from '../../interfaces/author';

const getAll = async () => await Author.find({});

const get = async (id: string) => await Author.findById({ _id: id });

const create = async (author: AuthorType) => await Author.create(author);

const put = async (id: string, author: AuthorType) =>
  await Author.findByIdAndUpdate({ _id: id }, author);

const del = async (id: string) => await Author.deleteOne({ _id: id });

export default {
  getAll,
  get,
  create,
  put,
  del,
};
