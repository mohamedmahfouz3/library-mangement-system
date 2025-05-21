const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsyncErrors = require("./errorMiddleware").catchAsyncErrors;

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Login first to access this resource" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = decoded.id || decoded._id;
  req.user = await User.findById(userId);

  if (!req.user) {
    return res.status(401).json({ success: false, message: "User not found" });
  }
  if (!req.user.isVerified) {
    return res.status(401).json({
      success: false,
      message: "Please verify your email to access this resource",
    });
  }
  next();
});

exports.isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user.role}) is not allowed to access this resource`,
      });
    }
    next();
  };
};
