const crypto = require('crypto');
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req, res) => {
    try {
        // Get email from request body
        const email = req.body.email;

        // Check if user exists for this email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ success: false, message: "Your Email is not Registered With us" });
        }

        // Generate token 
        const token = crypto.randomUUID();

        // Update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );

        // Create URL
        const url = `http://localhost:3000/update-password/${token}`;

        // Send mail containing the URL
        await mailSender(email, "Password Reset Link", `Password Reset Link: ${url}`);

        // Return response
        return res.json({
            success: true,
            message: "Password Reset Link has been sent to your email"
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        // Data fetch
        const { password, confirmPassword, token } = req.body;

        // Validation  
        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: "Password and Confirm Password do not match"
            });
        }

        // Get userDetails from db using token
        const userDetails = await User.findOne({ token: token });

        // If no entry - invalid Token
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Invalid Token",
            });
        }

        // Token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: "Token is Expired please generate your Token",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Password update
        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }
        );

        // Return response
        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};
 