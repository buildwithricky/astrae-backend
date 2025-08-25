import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import cors from 'cors';
import morgan from 'morgan';

// USER ROUTES
import { userAuthRoutes } from './routes/user/auth.routes.js';

// Swagger Documentation
import { specs, swaggerUi } from './swagger.js';

const app = express();
const PORT = process.env.PORT || 5025;
const SERVER_NAME = "Astraae AI";
const PRIMARY_COLOR = "#FE4737";
const SECONDARY_COLOR = "#333333";
const LIGHT_COLOR = "#FFF5F4";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("combined"));

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #FE4737; font-size: 2.5em; }
    .swagger-ui .info .description { font-size: 1.1em; }
    .swagger-ui .scheme-container { background: #FFF5F4; padding: 20px; border-radius: 8px; }
    .swagger-ui .opblock.opblock-post .opblock-summary-method { background: #FE4737; }
    .swagger-ui .opblock.opblock-post .opblock-summary { border-color: #FE4737; }
    .swagger-ui .btn.execute { background-color: #FE4737; border-color: #FE4737; }
    .swagger-ui .btn.execute:hover { background-color: #e03d2f; border-color: #e03d2f; }
  `,
  customSiteTitle: 'Astrae AI API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    deepLinking: true
  }
}));

// Enhanced welcome route with animations
app.get('/', (req, res) => {
  const welcomePage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${SERVER_NAME} Server</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        
        :root {
          --primary: ${PRIMARY_COLOR};
          --secondary: ${SECONDARY_COLOR};
          --light: ${LIGHT_COLOR};
          --success: #00C853;
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          background-color: var(--light);
          color: var(--secondary);
          overflow-x: hidden;
        }
        
        .container {
          max-width: 900px;
          margin: 40px auto;
          background: white;
          padding: 50px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        }
        
        .container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(90deg, var(--primary), #ff7b6e);
        }
        
        h1 {
          color: var(--primary);
          font-size: 2.8rem;
          margin-bottom: 15px;
          position: relative;
          padding-bottom: 15px;
          font-weight: 700;
        }
        
        h1::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 80px;
          height: 5px;
          background: var(--primary);
          border-radius: 3px;
          transform-origin: left;
          animation: scaleIn 1s ease-out forwards;
        }
        
        h2 {
          color: var(--secondary);
          margin-top: 35px;
          font-weight: 600;
        }
        
        .server-info {
          background: rgba(254, 71, 55, 0.05);
          padding: 25px;
          border-radius: 12px;
          margin: 35px 0;
          border-left: 5px solid var(--primary);
          transition: all 0.3s ease;
        }
        
        .server-info:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(254, 71, 55, 0.1);
        }
        
        .tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin: 30px 0;
        }
        
        .tech-item {
          background: var(--primary);
          color: white;
          padding: 10px 22px;
          border-radius: 30px;
          font-size: 15px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(254, 71, 55, 0.3);
          transition: all 0.3s ease;
          cursor: default;
        }
        
        .tech-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(254, 71, 55, 0.4);
        }
        
        .status {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(0, 200, 83, 0.1);
          color: var(--success);
          border-radius: 16px;
          font-weight: 600;
          font-size: 15px;
          animation: pulse 2s infinite;
        }
        
        strong {
          color: var(--primary);
          font-weight: 600;
        }
        
        .logo {
          font-weight: 700;
          color: var(--primary);
          position: relative;
          display: inline-block;
        }
        
        .logo::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 3px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        
        .logo:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        .pulse {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--success);
          margin-right: 8px;
          animation: pulse 2s infinite;
        }
        
        @keyframes scaleIn {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .floating {
          animation: floating 3s ease-in-out infinite;
        }
        
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .feature-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(254, 71, 55, 0.1);
          border-radius: 50%;
          margin-right: 15px;
          color: var(--primary);
          font-size: 20px;
        }
        
        .feature {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          padding: 15px;
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        .feature:hover {
          background: rgba(254, 71, 55, 0.05);
          transform: translateX(5px);
        }
        
        .feature-text {
          flex: 1;
        }
        
        .feature-title {
          font-weight: 600;
          margin-bottom: 5px;
          color: var(--secondary);
        }
        
        .feature-desc {
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div>
      Astae APi CLIENT
      </div>
    </body>
    </html>
  `;
  
  res.send(welcomePage);
});

// USER ROUTES
app.use("/api/v1/user/auth", userAuthRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`${SERVER_NAME} server is running on port ${PORT}`);
  console.log(`Welcome page available at: http://localhost:${PORT}`);
});

export default app;
