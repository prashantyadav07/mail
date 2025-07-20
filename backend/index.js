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
import userRoutes from './routes/userRoutes.js'; // <-- Import the new user routes

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
app.use('/api/users', userRoutes); // <-- Activate the new user routes

// Database Connection & Server Start
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('✅ MongoDB connected successfully');
  app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});