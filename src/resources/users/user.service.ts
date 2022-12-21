import userRepo from './user.db.repository';
import UserType from '../../interfaces/user';
import { getHashPsw } from '../../utils/hashFn';

const getAll = async () => await userRepo.getAll();
const get = async (id: string) => await userRepo.get(id);

const create = async (user: UserType) => {
  const { password } = user;
  const hashPassword = await getHashPsw(password);
  user.password = hashPassword;
  return await userRepo.create(user);
};

const put = async (id: string, user: UserType) => await userRepo.put(id, user);
const del = async (id: string) => await userRepo.del(id);

const getUserByLogin = async (login: string) => await userRepo.getUserByLogin(login);

export default {
  getAll,
  get,
  create,
  put,
  del,
  getUserByLogin,
};
