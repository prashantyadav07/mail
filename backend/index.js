import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Import all route handlers
import authRoutes from './routes/authRoutes.js';
import aiFormRoutes from './routes/aiFormRoutes.js';
import formRoutes from './routes/formRoutes.js';
import formResponseRoutes from './routes/formResponseRoutes.js';
import mailRoutes from './routes/mailRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { startEmailScheduler } from './schedulers/emailScheduler.js';

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Route Configuration
app.use('/api/auth', authRoutes);
app.use('/api/ai-form', aiFormRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/responses', formResponseRoutes);
app.use('/api/mail', mailRoutes);
app.use('/api/users', userRoutes);


// Database Connection & Server Start
// NOTE: Mongoose 6+ mein useNewUrlParser aur useUnifiedTopology ki zaroorat nahi hoti.
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');

    // Server ko tabhi start karein jab Database connect ho jaye
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      
      // --- YAHAN Galti thi ---
      // Scheduler ko server start hone ke BAAD chalu karein.
      // Ise .then() block ke andar hona chahiye.
      startEmailScheduler();
      console.log('📧 Email scheduler has been started and is running every minute.');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Stray '});' yahan se hata diya gaya hai jo syntax error de raha tha.