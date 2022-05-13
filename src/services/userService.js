const UserRepository = require('../repositories/userRepository');

const repository = new UserRepository();

const findById = async (id) => {
  return await repository.findById(id);
};

const findByEmail = async (email) => {
  return await repository.findByEmail(email);
};

const findAll = async (filter, options) => {
  return await repository.findAllPaginate(filter, options);
};

const create = async (user) => {
  return await repository.create(user);
};

const update = async (id, user) => {
  return await repository.update(id, user);
};

const remove = async (id) => {
  return await repository.remove(id);
};

module.exports = {
  findById,
  findByEmail,
  findAll,
  create,
  update,
  remove,
};
