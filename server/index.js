import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { sequelize } from './database/db.js';
import vehicleRoutes from './routes/vehicles.js';
import bookingRoutes from './routes/bookings.js';
import { seedDatabase } from './database/seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);

// Sync database and start server
const startServer = async () => {
  try {
    await sequelize.sync({ force: true }); // In production, set force to false
    console.log('Database synchronized');
    
    // Seed the database
    await seedDatabase();
    console.log('Database seeded successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();