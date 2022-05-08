const express = require('express');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllUsers = (req, res) => {
  const users = [
    {
      id: 1,
      name: 'Damian',
    },
    {
      id: 2,
      name: 'Tene',
    },
  ];
  res.json(users);
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createUser = (req, res) => {
  const { name } = req.body;
  res.status(201).json({
    msg: `POST`,
    name,
  });
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateUser = (req, res) => {
  const { id } = req.params;
  const user = req.body;

  user.id = id;

  res.json({ msg: 'PUT', id });
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updatePartialUser = (req, res) => {
  res.json({ msg: 'PATCH' });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  res.json({ msg: `DELETE ${id}` });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  updatePartialUser,
  deleteUser,
};
