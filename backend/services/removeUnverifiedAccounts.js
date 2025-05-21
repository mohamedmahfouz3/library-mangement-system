const cron = require('node-cron');
const User = require('../models/userModel');

const removeUnverifiedAccounts = () => {
  // Schedule task to run daily at midnight
  cron.schedule('0 0 * * *', async () => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7); // Remove accounts unverified for more than 7 days

    const result = await User.deleteMany({
      isVerified: false,
      createdAt: { $lt: cutoffDate },
    });

    console.log(`Removed ${result.deletedCount} unverified accounts`);
  });
};

module.exports = removeUnverifiedAccounts;
