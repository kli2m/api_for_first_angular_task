import jwt from 'jsonwebtoken';
import usersService from '../users/user.service';
import config from '../../common/config';
import { isVerifyPsw } from '../../utils/hashFn';
import UserType from '../../interfaces/user';

const getToken = async ({ login, password }: UserType) => {
  const { JWT_SECRET_KEY } = config;

  const user = await usersService.getUserByLogin(login);
  
  if (!user) throw new Error('User not found');

  const isResCompare = await isVerifyPsw(password, user.password);

  if (!isResCompare) throw new Error('Password is wrong');

  if (!JWT_SECRET_KEY) throw new Error('JWT_SECRET_KEY is wrong');

  return jwt.sign({ id: user._id, login: user.login }, JWT_SECRET_KEY);
};

export default {
  getToken,
};
