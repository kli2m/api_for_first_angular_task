const { Author } = require('./author.db.model');

const getAll = async () => await Author.find({});

const get = async (id) => await Author.findById({ _id: id });

const create = async (author) => await Author.create(author);

const put = async (id, author) => await Author.findByIdAndUpdate({ _id: id }, author);

const del = async (id) => await Author.deleteOne({ _id: id });

module.exports = {
  getAll,
  get,
  create,
  put,
  del,
};
