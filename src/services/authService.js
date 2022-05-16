const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require('../errors/appError');
const { findByEmail, findById } = require('./userService');
const config = require('../config');

const login = async (email, password) => {
  try {
    const user = await findByEmail(email);
    if (!user) {
      throw new AppError(
        'Authentication failed! Email / Password not correct',
        400
      );
    }

    if (!user.enabled) {
      throw new AppError('User disabled', 400);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new AppError(
        'Authentication failed! Email / Password not correct',
        400
      );
    }

    const token = _encrypt(user.id);

    return {
      user: user.name,
      token,
      role: user.role,
    };
  } catch (err) {
    throw err;
  }
};

const validToken = async (token) => {
  try {
    if (!token) {
      throw new AppError('Authentication failed! Token required.', 401);
    }

    let id;
    try {
      const object = jwt.verify(token, config.auth.secret);
      id = object.id;
    } catch (err) {
      throw new AppError('Authentication failed! Invalid Token.', 401, token);
    }

    const user = await findById(id);

    if (!user) {
      throw new AppError(
        'Authentication failed! Invalid Token - User not found',
        401
      );
    }

    if (!user.enabled) {
      throw new AppError('Authentication failed! User disabled.', 401);
    }

    return user;
  } catch (err) {
    throw err;
  }
};

_encrypt = (id) => {
  return jwt.sign({ id }, config.auth.secret, { expiresIn: config.auth.ttl });
};

module.exports = { login, validToken };
