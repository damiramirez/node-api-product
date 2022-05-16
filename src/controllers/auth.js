const express = require('express');
const Success = require('../helpers/successHelper');
const { login } = require('../services/authService');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    res.json(new Success(await login(email, password)));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  loginUser,
};
