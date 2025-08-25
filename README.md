# CertZilla AI Backend API

A comprehensive Node.js backend API for the CertZilla AI platform with user authentication and management features.

## 🚀 Features

- **User Authentication**: Complete user registration, login, and password management
- **JWT Security**: Secure token-based authentication
- **Password Reset**: OTP-based password reset functionality
- **Email Integration**: Nodemailer integration for OTP delivery
- **MongoDB Integration**: Mongoose ODM for data persistence
- **API Documentation**: Comprehensive Swagger/OpenAPI documentation
- **Error Handling**: Robust error handling and validation
- **Security**: bcrypt password hashing and CORS support

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- SMTP email service (for OTP functionality)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd certzilla-ai-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   PORT=5025
   MONGODB_URI=mongodb://localhost:27017/certzilla_ai
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Interactive API Documentation

Access the interactive Swagger UI documentation at:
```
http://localhost:5025/api-docs
```

### API Endpoints

#### Base URL
```
http://localhost:5025/api/v1
```

#### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/auth/signup` | Register a new user | No |
| POST | `/user/auth/login` | User login | No |
| POST | `/user/auth/forgot-password` | Send OTP for password reset | No |
| POST | `/user/auth/verify-otp` | Verify OTP | No |
| POST | `/user/auth/reset-password` | Reset password after OTP verification | No |

### Detailed API Reference

#### 1. User Registration

**Endpoint:** `POST /api/v1/user/auth/signup`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "phone_no": "+1234567890",
  "password": "SecurePassword123!",
  "confirmPassword": "SecurePassword123!"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully.",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. User Login

**Endpoint:** `POST /api/v1/user/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful.",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Forgot Password

**Endpoint:** `POST /api/v1/user/auth/forgot-password`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "OTP sent to your email"
}
```

#### 4. Verify OTP

**Endpoint:** `POST /api/v1/user/auth/verify-otp`

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "OTP verified. You can now reset password."
}
```

#### 5. Reset Password

**Endpoint:** `POST /api/v1/user/auth/reset-password`

**Request Body:**
```json
{
  "email": "john@example.com",
  "newPassword": "NewSecurePassword123!",
  "confirmPassword": "NewSecurePassword123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful."
}
```

### Error Responses

All endpoints return consistent error responses:

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Error description"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Authentication required"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

## 🗄️ Database Schema

### User Model

```javascript
{
  username: String,
  email: String (unique),
  phone_no: String,
  password: String (hashed),
  otp: String,
  otpExpires: Date,
  isOtpVerified: Boolean (default: false),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure authentication tokens
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configurable cross-origin resource sharing
- **OTP Expiration**: Time-limited OTP codes (10 minutes)

## 📧 Email Configuration

The application uses Nodemailer for sending OTP emails. Configure your SMTP settings in the `.env` file:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

For Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an app-specific password
3. Use the app password in EMAIL_PASS

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5025
MONGODB_URI=mongodb://your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-email-password
```

### PM2 Deployment

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start server.js --name "certzilla-ai-backend"

# Monitor the application
pm2 monit

# View logs
pm2 logs certzilla-ai-backend
```

## 🧪 Testing

### Manual Testing with Swagger UI

1. Start the server: `npm run dev`
2. Open: `http://localhost:5025/api-docs`
3. Use the interactive interface to test endpoints

### Testing with cURL

**User Registration:**
```bash
curl -X POST http://localhost:5025/api/v1/user/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "phone_no": "+1234567890",
    "password": "TestPassword123!",
    "confirmPassword": "TestPassword123!"
  }'
```

**User Login:**
```bash
curl -X POST http://localhost:5025/api/v1/user/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

## 📁 Project Structure

```
certzilla-ai-backend/
├── src/
│   ├── app.js                 # Main application file
│   ├── swagger.js            # Swagger configuration
│   ├── db.js                 # Database connection
│   ├── controllers/          # Route controllers
│   │   └── user/
│   │       └── auth.controller.js
│   ├── models/               # Database models
│   │   └── user.model.js
│   ├── routes/               # API routes
│   │   └── user/
│   │       └── auth.routes.js
│   ├── services/             # Business logic services
│   │   └── nodemailer.js
│   ├── middlewares/          # Express middlewares
│   │   └── error-handler.js
│   └── utils/                # Utility functions
│       └── generate-jwt.js
├── package.json
├── server.js
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Email: support@certzilla.ai
- Documentation: `http://localhost:5025/api-docs`
- Issues: Create an issue in the repository

## 🔄 Changelog

### Version 1.0.0
- Initial release
- User authentication system
- Password reset functionality
- Swagger API documentation
- MongoDB integration
- Email service integration
# astrae-backend
