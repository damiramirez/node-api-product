const { check, validationResult } = require('express-validator');

const _nameRequired = check('name', 'Name is required').not().isEmpty();

const _validationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(`Validation Errors: ${JSON.stringify(errors)}`);
  }
  next();
};

const postValidations = [_nameRequired, _validationResult];

module.exports = {
  postValidations,
};
