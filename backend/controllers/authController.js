const User = require('../models/userModel');
const { catchAsyncErrors } = require('../middlewares/errorMiddleware');
const sendVerificationCode = require('../utils/sendVerificationCode');
const sendEmail = require('../utils/sendEmail');
const sendToken = require('../utils/sendToken');
const { generateVerificationOtpEmailTemplate } = require('../utils/emailTemplates');

exports.register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  user = new User({ name, email, password });
  const verificationCode = user.generateVerificationCode();

  await user.save();

  // Send verification code email
  const message = generateVerificationOtpEmailTemplate(verificationCode);
  await sendEmail({
    email: user.email,
    subject: 'Verification Code',
    message,
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully. Verification code sent to email.',
  });
});

exports.verifyOTP = catchAsyncErrors(async (req, res, next) => {
  const { email, verificationCode } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid email' });
  }

  if (user.isVerified) {
    return res.status(400).json({ success: false, message: 'User already verified' });
  }

  if (user.verificationCode !== verificationCode) {
    return res.status(400).json({ success: false, message: 'Invalid verification code' });
  }

  user.isVerified = true;
  user.verificationCode = undefined;
  await user.save();

  sendToken(user, 200, res);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid email or password' });
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(400).json({ success: false, message: 'Invalid email or password' });
  }

  if (!user.isVerified) {
    return res.status(400).json({ success: false, message: 'User not verified' });
  }

  sendToken(user, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});
