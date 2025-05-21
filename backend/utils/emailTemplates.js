const generateVerificationOtpEmailTemplate = (verificationCode) => {
  return `
    <h1>Verification Code</h1>
    <p>Your verification code is: <strong>${verificationCode}</strong></p>
    <p>Please enter this code to verify your account.</p>
  `;
};

const generateForgotPasswordEmailTemplate = (resetPasswordUrl) => {
  return `
    <h1>Reset Password</h1>
    <p>You requested to reset your password. Click the link below to reset it:</p>
    <a href="${resetPasswordUrl}">${resetPasswordUrl}</a>
    <p>If you did not request this, please ignore this email.</p>
  `;
};

module.exports = {
  generateVerificationOtpEmailTemplate,
  generateForgotPasswordEmailTemplate,
};
