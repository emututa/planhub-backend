import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes';
import postRoutes from './src/routes/postRoutes';
import eventRoutes from './src/routes/eventRoutes';
import registrationRoutes from './src/routes/registrationRoutes';
import adminRoutes from './src/routes/adminRoutes';  // ADD THIS

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/admin', adminRoutes);  

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'PlanHub Backend API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      posts: '/api/posts',
      events: '/api/events',
      registrations: '/api/registrations',
      admin: '/api/admin'  
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});







