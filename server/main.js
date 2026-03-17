import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import userRoutes from './src/routes/userRoutes.js';
import advisorRoutes from './src/routes/advisorRoutes.js';
import produceRoutes from './src/routes/produceRoutes.js';
import marketRoutes from './src/routes/marketRoutes.js';
import loanRoutes from './src/routes/loanRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import demandListingRoutes from './src/routes/demandListingRoutes.js';
import saccoRoutes from './src/routes/saccoRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';

// Import services and utilities
import { initializeCronJobs } from './src/utils/cronJobs.js';

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Global BigInt serialization fix for Prisma/JSON
BigInt.prototype.toJSON = function() {
  return this.toString();
};

// Initialize Express app
const app = express();

// Configure CORS origins
const allowedOrigins = (process.env.CORS_ORIGIN?.split(',') || [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:8080',
]).map(s => s.trim()).filter(Boolean);

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Express middleware
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('dev'));

// Initialize cron jobs (handles verification code cleanup)
initializeCronJobs();

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/advisor', advisorRoutes);
app.use('/api/produce', produceRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/demand', demandListingRoutes);
app.use('/api/sacco', saccoRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ ok: true, timestamp: new Date() });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
  
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Authentication Server running on http://localhost:${port}`);
});

export default app;