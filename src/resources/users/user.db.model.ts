import mongoose, { Schema } from 'mongoose';
import UserType from '../../interfaces/user';
import { v4 as uuidv4 } from 'uuid';

const userSchema: Schema<UserType> = new mongoose.Schema(
  {
    login: { type: String, unique: true },
    password: String,
    _id: { type: String, default: () => uuidv4() },
  },
  { versionKey: false },
);

const toResponse = (user: UserType) => {
  const { _id, login } = user;
  return { id: _id, login };
};

const User = mongoose.model('User', userSchema);

export { User, toResponse };
