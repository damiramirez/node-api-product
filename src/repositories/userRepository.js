const bcrypt = require('bcrypt');

const User = require('../models/User');

class UserRepository {
  constructor() {}

  async findAll() {
    return await User.find();
  }

  async findAllPaginate(filter, options) {
    return await User.paginate(filter, options);
  }

  async findById(id) {
    return await User.findById(id);
  }

  async create(user) {
    user.password = await bcrypt.hash(user.password, 10);
    return await User.create(user);
  }

  async update(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
  }

  async remove(id) {
    return await User.findByIdAndRemove(id);
  }
}

module.exports = UserRepository;
