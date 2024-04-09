const bcrypt = require("bcrypt");
const Users = require("../models/Users");
require("dotenv").config();

// Signup route handler
exports.signup = async (req, res) => {
  
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // Create a new user
    const user = await Users.create({
      name,
      email,
      password: hashedPassword, // Use hashed password
      role,
    });

    // Respond with success message
    return res.status(201).json({
      success: true,
      id: user._id,
      message: "Signup successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error. User cannot be registered. Please try again.",
    });
  }
};
