const UserRepository = require('../repositories/userRepository');

const repository = new UserRepository();

const findById = async (id) => {
  return await repository.findById(id);
};

const findAll = async () => {
  return await repository.findAll();
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
  findAll,
  create,
  update,
  remove,
};
