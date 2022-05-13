const { check, validationResult } = require('express-validator');
const { ROLES } = require('../../constant');
const AppError = require('../../errors/appError');
const { findByEmail, findById } = require('../../services/userService');

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
const _validationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(`Validation Errors`, 400, errors.errors);
  }
  next();
};
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
  _nameRequired,
  _lastnameRequired,
  _emailRequired,
  _emailValid,
  _emailUnique,
  _passwordRequired,
  _roleValid,
  _birthdateValid,
  _validationResult,
];

const putValidations = [
  _idExist,
  _idRequired,
  _idIsMoongoDB,
  _optionalEmailValid,
  _optionalEmailUnique,
  _roleValid,
  _birthdateValid,
  _validationResult,
];

module.exports = {
  postValidations,
  putValidations,
};
