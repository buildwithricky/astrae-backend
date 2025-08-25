# 🚀 Quick Start Guide - CertZilla AI Backend

Get your CertZilla AI backend up and running in minutes!

## ⚡ Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
```bash
# Copy the example environment file
cp env.example .env

# Edit .env with your configuration
nano .env
```

**Required Environment Variables:**
```env
MONGODB_URI=mongodb://localhost:27017/certzilla_ai
JWT_SECRET=your_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### 3. Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### 4. Access API Documentation
Open your browser and go to:
```
http://localhost:5025/api-docs
```

## 🧪 Test Your API

### Quick Test with cURL

**1. Register a User:**
```bash
curl -X POST http://localhost:5025/api/v1/user/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "phone_no": "+1234567890",
    "password": "TestPass123!",
    "confirmPassword": "TestPass123!"
  }'
```

**2. Login:**
```bash
curl -X POST http://localhost:5025/api/v1/user/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

## 📱 API Endpoints Summary

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/user/auth/signup` | POST | User registration |
| `/api/v1/user/auth/login` | POST | User authentication |
| `/api/v1/user/auth/forgot-password` | POST | Send password reset OTP |
| `/api/v1/user/auth/verify-otp` | POST | Verify OTP |
| `/api/v1/user/auth/reset-password` | POST | Reset password |

## 🔧 Common Issues & Solutions

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod

# Or if using MongoDB Atlas, check your connection string
```

### Email Configuration Issues
- For Gmail: Enable 2FA and use app-specific password
- Check firewall/antivirus blocking SMTP ports
- Verify email credentials in `.env`

### Port Already in Use
```bash
# Change port in .env
PORT=5026

# Or kill the process using the port
lsof -ti:5025 | xargs kill -9
```

## 📚 Next Steps

1. **Explore the API**: Use Swagger UI at `/api-docs`
2. **Read the Full Documentation**: Check `README.md`
3. **Customize**: Modify schemas, add new endpoints
4. **Deploy**: Follow deployment guide in README

## 🆘 Need Help?

- **Documentation**: `http://localhost:5025/api-docs`
- **README**: Check `README.md` for detailed information
- **Issues**: Create an issue in the repository

---

**Happy Coding! 🎉**
