const express = require('express');
const router = express.Router();
const {
  mostrarLogin,
  login,
  mostrarRegister,
  register,
  logout
} = require('../controllers/authController');

// LOGIN
router.get('/login', mostrarLogin);
router.post('/login', login);

// REGISTER
router.get('/register', mostrarRegister);
router.post('/register', register);

// LOGOUT
router.get('/logout', logout);

module.exports = router;

