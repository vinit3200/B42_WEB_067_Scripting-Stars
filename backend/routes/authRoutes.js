const express = require('express');
const { signup, login, forgotPassword, resetPassword ,logout, deleteAccount } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);
router.post('/delete-account', deleteAccount);

module.exports = router;
