import { User } from './user.db.model';
import UserType from '../../interfaces/user';

const getAll = async () => await User.find({});

const get = async (id: string) => await User.findById({ _id: id });

const create = async (user: UserType) => {
  const res = await User.findOne({ login: user.login }).exec();
  if (res) throw new Error('This name already exists');
  return await User.create(user);
};

const put = async (id: string, user: UserType) => await User.findByIdAndUpdate({ _id: id }, user);

const del = async (id: string) => await User.deleteOne({ _id: id });

const getUserByLogin = async (login: string) => await User.findOne({ login });

export default {
  getAll,
  get,
  create,
  put,
  del,
  getUserByLogin,
};
