import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/db.js';

const PORT = process.env.PORT || 5025;

// Connect to DB & Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
});
