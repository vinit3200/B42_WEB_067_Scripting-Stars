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

    // Hash password
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error });
  }
};

/**
 * User Login
 */


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log(password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};


/**
 * Forgot Password - Send OTP via Email
 */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check rate limit (Prevent OTP spam)
    console.log("checking Radis connection...")
    const lastOtpTime = await redisClient.get(`otp_time_${email}`);
    console.log("lastOtpTime: ", lastOtpTime)
    if (lastOtpTime && Date.now() - lastOtpTime < 2 * 60 * 1000) {
      return res.status(429).json({ message: 'OTP request limit exceeded. Try again later.' });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false });

    // Store OTP in Redis with expiry (10 minutes)
    await redisClient.setEx(`otp_${email}`, 600, otp); // Expire in 10 min
    await redisClient.setEx(`otp_time_${email}`, 120, Date.now()); // Prevent spam (2 min)

    // Send OTP via Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    });

    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error });
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
    const { token } = req.body;
    await redisClient.setEx(`blacklist_${token}`, 3600, "blacklisted"); // Blacklist for 1 hour
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error });
  }
};

/**
 * Delete Account
 */
exports.deleteAccount = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOneAndDelete({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account', error });
  }
};
