import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import authRoutes from './routes/authRoutes.js';
import aiFormRoutes from './routes/aiFormRoutes.js';
import formRoutes from './routes/formRoutes.js';
import formResponseRoutes from './routes/formResponseRoutes.js';
import mailRoutes from './routes/mailRoutes.js';
import userRoutes from './routes/userRoutes.js';
import testRoute from './routes/testRoute.js';
import { startEmailScheduler } from './schedulers/emailScheduler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// --- FINAL & ROBUST CORS CONFIGURATION ---
const allowedOrigins = [
  'https://communicateai.netlify.app', // Deployed Frontend
  'http://localhost:5173',           // Local Vite Frontend
  'http://localhost:3000',           // Local React Frontend
];

const corsOptions = {
  origin: (origin, callback) => {
    // Logging to debug which origin is being received by the server
    console.log(`CORS Check: Request received from origin -> ${origin}`);

    // Allow requests with no origin (like mobile apps, curl, Postman)
    // or if the origin is in our whitelist
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      console.log(`CORS Status: ALLOWED for origin -> ${origin}`);
      callback(null, true);
    } else {
      // YAHAN BADLAAV KIYA GAYA HAI - Hum 'false' ki jagah ek Error bhej rahe hain
      console.error(`CORS Status: BLOCKED for origin -> ${origin}`);
      callback(new Error('This origin is not allowed by our CORS policy.'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
  optionsSuccessStatus: 200,
};

// IMPORTANT: Use CORS middleware before any routes
app.use(cors(corsOptions));

// The pre-flight handler for all routes
app.options('*', cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/ai-form', aiFormRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/responses', formResponseRoutes);
app.use('/api/mail', mailRoutes);
app.use('/api/users', userRoutes);
app.use('/api/test', testRoute);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!', status: 'OK' });
});

// --- Error Handling Middleware (MUST BE AT THE END) ---
// 404 Not Found Handler
app.use('*', (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  // Specifically handle CORS errors
  if (err.message.includes('CORS')) {
    return res.status(403).json({ message: err.message });
  }
  
  // Log other errors
  console.error('An unexpected error occurred:', err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// --- Database Connection & Server Start ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      startEmailScheduler();
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });