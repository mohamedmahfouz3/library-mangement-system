const sendEmail = require('./sendEmail');

const sendVerificationCode = async (email, code) => {
  const message = `Your verification code is: ${code}`;
  await sendEmail({
    email,
    subject: 'Verification Code',
    message,
  });
};

module.exports = sendVerificationCode;
