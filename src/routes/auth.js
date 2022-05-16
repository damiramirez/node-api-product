const { Router } = require('express');
const { loginUser } = require('../controllers/auth');
const { postRequestValidation } = require('../middlewares/auth');

const router = Router();

router.post('/login', postRequestValidation, loginUser);

module.exports = router;
