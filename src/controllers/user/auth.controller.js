import { UserModel } from "../../models/user.model.js";
import { sendEmail } from "../../services/nodemailer.js";
import { generateToken } from "../../utils/generate-jwt.js";
import crypto from "crypto";

const registerUser = async (req, res) => {
  try {
    const { username, email, phone_no, password, confirmPassword } = req.body;

    if (!username || !email || !phone_no || !password || !confirmPassword)
      return res.status(400).json({ success: false, message: "All fields are required." });

    if (password !== confirmPassword)
      return res.status(400).json({ success: false, message: "Passwords do not match." });

    const userExists = await UserModel.findOne({ email });
    if (userExists)
      return res.status(400).json({ success: false, message: "User already exists with this email." });

    const user = await UserModel.create({
      username,
      email,
      phone_no,
      password,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
   
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password are required." });

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found." });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: "Email or Password Incorrect" });

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const sendOtpForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ success: false, message: "Email is required." });

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "No user found with this email." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    user.otp = otp;
    user.otpExpires = otpExpiry;
    await user.save();

    await sendEmail({
      to: email,
      subject: "Reset Your Password - Certzilla",
      html: `<h3>Your OTP: <b>${otp}</b></h3><p>Expires in 10 minutes</p>`
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to your email"
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
};


const sendEmailVerificationOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ success: false, message: "Email is required." });

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(200).json({ success: false, message: "if email is registered on our system you should receive a code" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    user.otp = otp;
    user.otpExpires = otpExpiry;
    await user.save();

    await sendEmail({
      to: email,
      subject: "Verify Your Email - Certzilla",
      html: `<h3>Your OTP: <b>${otp}</b></h3><p>Expires in 10 minutes</p>`
    });
    res.status(200).json({
      success: true,
      message: "OTP sent to your email"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
};



const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ success: false, message: "Email and OTP are required." });

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found." });

    if (user.otp !== otp)
      return res.status(400).json({ success: false, message: "Invalid OTP." });

    if (user.otpExpires < new Date())
      return res.status(400).json({ success: false, message: "OTP expired." });

    // Invalidate OTP after verification
    user.otp = null;
    user.otpExpires = null;
    user.isOtpVerified = true;
    await user.save();

    res.status(200).json({ success: true, message: "OTP verified."});

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, resetToken } = req.body;

    if (!email || !newPassword || !resetToken) {
      return res.status(400).json({ success: false, message: "Email, new password, and reset token are required." });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    if (!user.resetPasswordToken || user.resetPasswordToken !== hashedToken) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset token.s" });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ success: false, message: "Reset token has expired." });
    }
    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    res.status(200).json({ success: true, message: "Password has been reset successfully." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};





const exchangeOtpForResetToken = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ success: false, message: "Email and OTP are required." });

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found." });

    if (user.otp !== otp)
      return res.status(400).json({ success: false, message: "Invalid OTP." });

    if (user.otpExpires < Date.now())
      return res.status(400).json({ success: false, message: "OTP expired." });

    user.otp = null;
    user.otpExpires = null;
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified.",
      resetToken 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};




export {
  registerUser,
  loginUser,
  sendOtpForgotPassword,
  verifyOtp,
  resetPassword,
  sendEmailVerificationOtp,
  exchangeOtpForResetToken
}