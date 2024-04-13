//

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    //Extract JWT Token
    const token = req.body.token;

    if (!token) {
      return res.status(401).json({
        succes: false,
        message: "Token Missing",
      });
    }

    //verify the Token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);

      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is Invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      succes: false,
      message: "something went wrong, while ing the token",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        succes: false,
        message: "This is a Protected route for students",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role is not matching",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        succes: false,
        message: "This is a Protected route for admin",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role is not matching",
    });
  }
};
