const express = require('express');
const { getAllUsers, registerNewAdmin } = require('../controllers/userController');
const { catchAsyncErrors } = require('../middlewares/errorMiddleware');
const { isAuthenticated, isAuthorized } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/all', isAuthenticated, isAuthorized('admin'), catchAsyncErrors(getAllUsers));
router.post('/register-admin', isAuthenticated, isAuthorized('admin'), catchAsyncErrors(registerNewAdmin));

module.exports = router;
