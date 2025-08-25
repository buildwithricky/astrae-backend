import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CertZilla AI Backend API',
      version: '1.0.0',
      description: 'A comprehensive API for CertZilla AI platform with user authentication and management features',
      contact: {
        name: 'CertZilla AI Team',
        email: 'support@certzilla.ai'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:5025',
        description: 'Development server'
      },
      {
        url: 'https://api.certzilla.ai',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token for authentication'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the user',
              example: '507f1f77bcf86cd799439011'
            },
            username: {
              type: 'string',
              description: 'Username of the user',
              example: 'john_doe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address of the user',
              example: 'john@example.com'
            },
            phone_no: {
              type: 'string',
              description: 'Phone number of the user',
              example: '+1234567890'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              default: 'user',
              description: 'User role in the system'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'User last update timestamp'
            }
          }
        },
        UserRegistration: {
          type: 'object',
          required: ['username', 'email', 'phone_no', 'password', 'confirmPassword'],
          properties: {
            username: {
              type: 'string',
              description: 'Username for the new account',
              example: 'john_doe',
              minLength: 3,
              maxLength: 30
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address for the new account',
              example: 'john@example.com'
            },
            phone_no: {
              type: 'string',
              description: 'Phone number for the new account',
              example: '+1234567890'
            },
            password: {
              type: 'string',
              description: 'Password for the new account',
              example: 'SecurePassword123!',
              minLength: 8
            },
            confirmPassword: {
              type: 'string',
              description: 'Password confirmation',
              example: 'SecurePassword123!'
            }
          }
        },
        UserLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address for login',
              example: 'john@example.com'
            },
            password: {
              type: 'string',
              description: 'Password for login',
              example: 'SecurePassword123!'
            }
          }
        },
        ForgotPassword: {
          type: 'object',
          required: ['email'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address to send OTP',
              example: 'john@example.com'
            }
          }
        },
        VerifyOtp: {
          type: 'object',
          required: ['email', 'otp'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address to verify OTP',
              example: 'john@example.com'
            },
            otp: {
              type: 'string',
              description: '6-digit OTP code',
              example: '123456',
              minLength: 6,
              maxLength: 6
            }
          }
        },
        ResetPassword: {
          type: 'object',
          required: ['email', 'newPassword', 'confirmPassword'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address to reset password',
              example: 'john@example.com'
            },
            newPassword: {
              type: 'string',
              description: 'New password',
              example: 'NewSecurePassword123!',
              minLength: 8
            },
            confirmPassword: {
              type: 'string',
              description: 'New password confirmation',
              example: 'NewSecurePassword123!'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indicates if the operation was successful'
            },
            message: {
              type: 'string',
              description: 'Response message'
            },
            user: {
              $ref: '#/components/schemas/User'
            },
            token: {
              type: 'string',
              description: 'JWT authentication token'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indicates if the operation was successful',
              example: false
            },
            message: {
              type: 'string',
              description: 'Error message',
              example: 'An error occurred'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization endpoints'
      }
    ]
  },
  apis: ['./src/routes/**/*.js', './src/controllers/**/*.js']
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
