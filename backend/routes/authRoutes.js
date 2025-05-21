const express = require('express');
const { register, verifyOTP, login, logout } = require('../controllers/authController');
const { catchAsyncErrors } = require('../middlewares/errorMiddleware');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', catchAsyncErrors(register));
router.post('/verify-otp', catchAsyncErrors(verifyOTP));
router.post('/login', catchAsyncErrors(login));
router.get('/logout', isAuthenticated, catchAsyncErrors(logout));

module.exports = router;
