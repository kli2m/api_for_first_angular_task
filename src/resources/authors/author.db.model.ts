import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface AuthorType {
  name: string;
  surName: string;
  _id?: string;
  id?: string;
}

const authorSchema: Schema<AuthorType> = new mongoose.Schema(
  {
    name: String,
    surName: String,
    _id: { type: String, default: () => uuidv4() },
  },
  { versionKey: false },
);

const toResponse = (author: AuthorType): AuthorType => {
  const { _id, name, surName } = author;
  return { id: _id, name, surName };
};

const Author = mongoose.model('Author', authorSchema);

export { Author, toResponse };
