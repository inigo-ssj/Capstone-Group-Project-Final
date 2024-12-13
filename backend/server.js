const bcrypt = require("bcryptjs");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userController = require("./controllers/userController");
const { resetPassword } = require("./controllers/userController");
const User = require("./models/User");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Backend Route to Reset Password
app.post("/api/users/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    console.log("Received reset request for email:", email); // Log to see if the request is reaching the backend

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error resetting password:", error); // Log the error
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Test Route
app.get("/api/test", (req, res) => {
  res.send({ message: "Backend is working!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("MongoDB connection error:", error));

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
