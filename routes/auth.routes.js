const express = require('express');
const router = express.Router();
const {
  register,
  login,
  recover,
  resetPassword
} = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/recover', recover);
router.post('/reset-password', resetPassword); 

module.exports = router;
