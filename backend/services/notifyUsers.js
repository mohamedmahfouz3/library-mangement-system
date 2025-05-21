const cron = require('node-cron');
const Borrow = require('../models/borrowModel');
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');

const notifyUsers = () => {
  // Schedule task to run daily at 8 AM
  cron.schedule('0 8 * * *', async () => {
    const today = new Date();
    const dueSoonDate = new Date(today);
    dueSoonDate.setDate(dueSoonDate.getDate() + 3); // Notify 3 days before due date

    const borrows = await Borrow.find({
      dueDate: { $lte: dueSoonDate, $gte: today },
      status: 'borrowed',
    }).populate('user').populate('book');

    for (const borrow of borrows) {
      const user = borrow.user;
      const book = borrow.book;

      const message = `
        <h1>Book Due Reminder</h1>
        <p>Dear ${user.name},</p>
        <p>This is a reminder that the book <strong>${book.title}</strong> is due on <strong>${borrow.dueDate.toDateString()}</strong>.</p>
        <p>Please return it on time to avoid fines.</p>
      `;

      await sendEmail({
        email: user.email,
        subject: 'Book Due Reminder',
        message,
      });
    }
  });
};

module.exports = notifyUsers;
