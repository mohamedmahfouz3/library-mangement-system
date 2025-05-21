const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

const connectDatabase = require("./database/db");
const { errorHandler } = require("./middlewares/errorMiddleware");

// Connect to database
connectDatabase();

const authRoutes = require("./routes/authRoutes");

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Library Management System Backend is running");
});

const passwordRoutes = require("./routes/passwordRoutes");

// Use auth routes
app.use("/api/auth", authRoutes);

const bookRoutes = require("./routes/bookRoutes");

// Use password routes
app.use("/api/password", passwordRoutes);

const borrowRoutes = require("./routes/borrowRoutes");

// Use book routes
app.use("/api/books", bookRoutes);

const userRoutes = require("./routes/userRoutes");

// Use borrow routes
app.use("/api/borrow", borrowRoutes);

// Use user routes
app.use("/api/users", userRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
