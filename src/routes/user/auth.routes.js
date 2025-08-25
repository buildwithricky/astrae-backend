import express from "express";

import { exchangeOtpForResetToken, loginUser,
  registerUser,
  resetPassword,
  sendEmailVerificationOtp,
  sendOtpForgotPassword,
  verifyOtp } from "../../controllers/user/auth.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/user/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with username, email, phone number, and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *           example:
 *             username: "john_doe"
 *             email: "john@example.com"
 *             phone_no: "+1234567890"
 *             password: "SecurePassword123!"
 *             confirmPassword: "SecurePassword123!"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: "User registered successfully."
 *               user:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 username: "john_doe"
 *                 email: "john@example.com"
 *                 role: "user"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request - validation errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missing_fields:
 *                 summary: Missing required fields
 *                 value:
 *                   success: false
 *                   message: "All fields are required."
 *               password_mismatch:
 *                 summary: Password confirmation mismatch
 *                 value:
 *                   success: false
 *                   message: "Passwords do not match."
 *               user_exists:
 *                 summary: User already exists
 *                 value:
 *                   success: false
 *                   message: "User already exists with this email."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/signup', registerUser);

router.post('/send-otp', sendEmailVerificationOtp);

/**
 * @swagger
 * /api/v1/user/auth/login:
 *   post:
 *     summary: Authenticate user login
 *     description: Login with email and password to receive authentication token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *           example:
 *             email: "john@example.com"
 *             password: "SecurePassword123!"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: "Login successful."
 *               user:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 username: "john_doe"
 *                 email: "john@example.com"
 *                 role: "user"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request - missing credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Email and password are required."
 *       401:
 *         description: Unauthorized - invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Invalid credentials."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "User not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/v1/user/auth/forgot-password:
 *   post:
 *     summary: Send OTP for password reset
 *     description: Send a 6-digit OTP to user's email for password reset functionality
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPassword'
 *           example:
 *             email: "john@example.com"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "OTP sent to your email"
 *       400:
 *         description: Bad request - missing email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Email is required."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "No user found with this email."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/forgot-password', sendOtpForgotPassword);

/**
 * @swagger
 * /api/v1/user/auth/verify-otp:
 *   post:
 *     summary: Verify OTP for password reset
 *     description: Verify the 6-digit OTP sent to user's email before allowing password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyOtp'
 *           example:
 *             email: "john@example.com"
 *             otp: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "OTP verified. You can now reset password."
 *       400:
 *         description: Bad request - validation errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missing_fields:
 *                 summary: Missing required fields
 *                 value:
 *                   success: false
 *                   message: "Email and OTP are required."
 *               invalid_otp:
 *                 summary: Invalid OTP
 *                 value:
 *                   success: false
 *                   message: "Invalid OTP."
 *               expired_otp:
 *                 summary: Expired OTP
 *                 value:
 *                   success: false
 *                   message: "OTP expired."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "User not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/verify-otp', verifyOtp);

/**
 * @swagger
 * /api/v1/user/auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Reset user password after OTP verification. Requires valid OTP verification.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *           example:
 *             email: "john@example.com"
 *             newPassword: "NewSecurePassword123!"
 *             confirmPassword: "NewSecurePassword123!"
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Password reset successful."
 *       400:
 *         description: Bad request - validation errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missing_fields:
 *                 summary: Missing required fields
 *                 value:
 *                   success: false
 *                   message: "All fields are required."
 *               password_mismatch:
 *                 summary: Password confirmation mismatch
 *                 value:
 *                   success: false
 *                   message: "Passwords do not match."
 *       401:
 *         description: Unauthorized - OTP not verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "OTP not verified or expired."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "User not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/reset-password', resetPassword);
router.post('/exchange-otp', exchangeOtpForResetToken);

export { router as userAuthRoutes};