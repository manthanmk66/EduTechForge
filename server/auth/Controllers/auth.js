const bcrypt = require("bcrypt");
const Users = require("../models/Users");
require("dotenv").config();
const jwt = require("jsonwebtoken");
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

//  login

exports.login = async (req, res) => {
  try {
    //data fetch

    const { email, password } = req.body;

    //validation on email and Password
    if (!email || !password) {
      return res.status(400).json({
        succes: false,
        message: "Please Fill all the Details Carefully",
      });
    }

    //check for registered users
    const user = await Users.findOne({ email });

    //if not a  regiastered user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    //verify password and Generate a JWT Token
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      // Restricted for not fetching password
      // user = user.toObject();

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("Manthantoken", token, options).status(200).json({
        success: true,
        message: "User Logged in Successfully",
        user: user,
      });
    } else {
      //password do not match
      return res.status(403).json({
        succes: false,
        message: "password Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};
