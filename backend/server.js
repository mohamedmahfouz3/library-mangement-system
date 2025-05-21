const app = require("./app");
const dotenv = require("dotenv");
const notifyUsers = require("./services/notifyUsers");
const removeUnverifiedAccounts = require("./services/removeUnverifiedAccounts");

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;

// Start automation services
notifyUsers();
removeUnverifiedAccounts();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
