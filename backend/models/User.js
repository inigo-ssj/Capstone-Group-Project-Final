const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, unique: true, sparse: true }, 
    phone: { type: String },
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      postalCode: { type: String, default: "" },
      country: { type: String, default: "" },
    },


    orders: { type: Array, default: [] }, // Order history
  },
  { timestamps: true }
);

// Avoid overwriting the model if it's already defined
const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
