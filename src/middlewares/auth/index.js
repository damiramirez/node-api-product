const { check } = require('express-validator');
const { validResult } = require('../commons');
const { validToken } = require('../../services/authService');

const _emailRequired = check('email', 'Email is required').not().isEmpty();
const _emailValid = check('email', 'Email invalid').isEmail();
const _passwordRequired = check('password', 'Password is required')
  .not()
  .isEmpty();

const postRequestValidation = [
  _emailRequired,
  _emailValid,
  _passwordRequired,
  validResult,
];

const validJWT = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    const user = await validToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postRequestValidation,
  validJWT,
};
