const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const redisClient = require("../config/redis"); // Redis client instance

dotenv.config();

// Configure nodemailer for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * User Signup
 */
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({ message: "Token is missing or invalid" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // Extract user ID from token

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare current password with hashed password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Error updating password", error: error.message });
  }
};


/**
 * Forgot Password - Send OTP via Email
 */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(`Received password reset request for: ${email}`);

    // Check if user exists in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found in DB");
      return res.status(404).json({ message: "User not found" });
    }

    // Check Redis Connection
    console.log("Checking Redis connection...");
    try {
      await redisClient.ping();
    } catch (err) {
      console.error("Redis connection failed:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    // Rate limiting (Prevent OTP spam)
    const lastOtpTime = await redisClient.get(`otp_time_${email}`);
    console.log("Last OTP Request Time:", lastOtpTime);
    if (lastOtpTime && Date.now() - lastOtpTime < 2 * 60 * 1000) {
      console.log("OTP request rate limit exceeded");
      return res
        .status(429)
        .json({ message: "OTP request limit exceeded. Try again later." });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
    });
    console.log(`Generated OTP for ${email}:`, otp);

    // Store OTP in Redis with expiry (10 min)
    await redisClient.setEx(`otp_${email}`, 600, otp); // Expire in 10 min
    await redisClient.setEx(`otp_time_${email}`, 120, Date.now().toString()); // Prevent spam (2 min)
    
    // Send OTP via Email
    console.log("Sending OTP email...");
    await transporter.sendMail({
      from: process.env.EMAIL_USER, 
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    });

    console.log("Email sent successfully to:", email);
    res.json({ message: "OTP sent to your email" });

  } catch (error) {
    console.error("Error in forgot-password:", error);
    res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
};

/**
 * Verify OTP and Reset Password
 */
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Get stored OTP from Redis
    const storedOtp = await redisClient.get(`otp_${email}`);
    if (!storedOtp) return res.status(400).json({ message: 'OTP expired or invalid' });

    if (storedOtp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });

    // Delete OTP from Redis after successful reset
    await redisClient.del(`otp_${email}`);

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
};

/**
 * User Logout 
 */
exports.logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Headers received:", req.headers.authorization);

    if (authHeader === undefined) {
      return res.status(400).json({ message: "Token is missing or invalid" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    // Store the token in Redis blacklist for 1 hour

    await redisClient.setEx(`blacklist_${token}`, 3600, "blacklisted");

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error });
  }
};

/**
 * Delete Account
 */

exports.deleteAccount = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({ message: "Token is missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Decode the token to extract `userId`
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // Extracted from token payload
    

    console.log("Deleting user with ID:", userId);

    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Optional: Blacklist token after account deletion
    await redisClient.setEx(`blacklist_${token}`, 3600, "blacklisted");

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Error deleting account", error: error.message });
  }
};
