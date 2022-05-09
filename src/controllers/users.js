const express = require('express');
const {
  findById,
  findAll,
  create,
  update,
  remove,
} = require('../services/userService');
const Success = require('../helpers/successHelper');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await findAll();
    res.json(new Success(users));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await findById(id);
    res.json(new Success(user));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createUser = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await create(user);

    res.status(201).json(new Success(newUser));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.body;

    const updatedUser = await update(id, user);

    res.json(new Success(updatedUser));
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await remove(id);

    res.json(new Success(user));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
