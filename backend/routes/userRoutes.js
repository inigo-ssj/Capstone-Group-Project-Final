const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import JWT
const User = require("../models/User");
const protect = require("../authMiddleware"); // Middleware for route protection
const userController = require("../controllers/userController");

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    // Validate inputs (you can add more validation as needed)
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Generate a default username if none is provided
    const defaultUsername = username || email.split("@")[0];

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username: defaultUsername, // Include username
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error in /register route:", error);
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
});

// User Login with JWT Generation
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET, // Secret from .env
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token, // Send the token in the response
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// GET /profile - Protected route to get user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      address: user.address || {
        street: null,
        city: null,
        postalCode: null,
        country: null,
      },
    });
  } catch (error) {
    console.error("Error in /profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const { updateUserProfile } = require("../controllers/userController");

// Route for updating user profile
router.put("/update", async (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1]; // Extract token
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const userId = decoded.id; // Get user ID from the token

    // Extract the data from the request body
    const { name, email, phone, address } = req.body; // Assuming you're sending these fields in the request body

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        phone,
        address,
      },
      { new: true }
    ); // { new: true } ensures the updated document is returned

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
});

module.exports = router;
