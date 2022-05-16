const { check } = require('express-validator');
const { ROLES } = require('../../constant');
const AppError = require('../../errors/appError');
const { findByEmail, findById } = require('../../services/userService');
const { validJWT } = require('../auth');
const { validResult } = require('../commons');

const _nameRequired = check('name', 'Name is required').not().isEmpty();
const _lastnameRequired = check('lastname', 'Lastname is required')
  .not()
  .isEmpty();
const _emailRequired = check('email', 'Email is required').not().isEmpty();
const _emailValid = check('email', 'Email invalid').isEmail();
const _emailUnique = check('email').custom(async (email = '') => {
  const userFound = await findByEmail(email);
  if (userFound) {
    throw new AppError('Email already exist in DB', 400);
  }
});
const _optionalEmailValid = check('email', 'Email invalid')
  .optional()
  .isEmail();
const _optionalEmailUnique = check('email')
  .optional()
  .custom(async (email = '') => {
    const userFound = await findByEmail(email);
    if (userFound) {
      throw new AppError('Email already exist in DB', 400);
    }
  });
const _passwordRequired = check('password', 'Password is required')
  .not()
  .isEmpty();
const _roleValid = check('role')
  .optional()
  .custom(async (role = '') => {
    if (!ROLES.includes(role)) {
      throw new AppError('Invalid role', 400);
    }
  });

const _birthdateValid = check('birthdate', 'Invalid Date')
  .optional()
  .isDate('MM-DD-YYYY');

const _idRequired = check('id', 'ID is required');
const _idIsMoongoDB = check('id', 'ID is not a Mongo ID').isMongoId();
const _idExist = check('id').custom(async (id = '') => {
  const userFound = await findById(id);
  if (!userFound) {
    throw new AppError('The ID not exist in DB', 400);
  }
});

const postValidations = [
  validJWT,
  _nameRequired,
  _lastnameRequired,
  _emailRequired,
  _emailValid,
  _emailUnique,
  _passwordRequired,
  _roleValid,
  _birthdateValid,
  validResult,
];

const putValidations = [
  validJWT,
  _idExist,
  _idRequired,
  _idIsMoongoDB,
  _optionalEmailValid,
  _optionalEmailUnique,
  _roleValid,
  _birthdateValid,
  validResult,
];

module.exports = {
  postValidations,
  putValidations,
};
