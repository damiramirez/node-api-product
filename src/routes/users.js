const { Router } = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const {
  postValidations,
  putValidations,
  getAllValidations,
  getValidations,
  deleteValidations,
} = require('../middlewares/users');

const router = Router();

router.get('/', getAllValidations, getAllUsers);
router.get('/:id', getValidations, getUserById);
router.post('/', postValidations, createUser);
router.put('/:id', putValidations, updateUser);
router.delete('/:id', deleteValidations, deleteUser);

module.exports = router;
