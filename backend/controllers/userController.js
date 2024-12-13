const User = require("../models/User"); // Import the user model
const jwt = require("jsonwebtoken");

// Function to update the user's profile
const updateUserProfile = async (req, res) => {
  try {
    // Destructure the fields from the request body
    const { name, email, phone, address } = req.body;

    // Get user ID from the JWT token (assuming token-based authentication)
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "your-secret-key"); // Replace 'your-secret-key' with your actual secret
    const userId = decoded.id;

    // Find the user by ID and update the fields
    const user = await User.findByIdAndUpdate(
      userId, // User ID from JWT
      {
        name: name,
        email,
        phone,
        address, // Update address if provided
      },
      { new: true } // Returns the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the updated user as the response
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error", error });
  }
  console.log("Request Body:", req.body);
  console.log("User ID:", userId);
};

module.exports = { updateUserProfile };

