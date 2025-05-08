import express from 'express';
import Booking from '../models/Booking.js';
import Vehicle from '../models/Vehicle.js';
import { sequelize } from '../database/db.js';
import { Op } from 'sequelize';

const router = express.Router();

// Create new booking
router.post('/', async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { firstName, lastName, vehicleId, startDate, endDate } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Validate dates
    if (start >= end) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }
    
    // Check if vehicle exists
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    
    // Check for overlapping bookings
    const overlappingBookings = await Booking.findAll({
      where: {
        vehicleId,
        status: 'confirmed',
        [Op.or]: [
          {
            startDate: { [Op.lte]: end },
            endDate: { [Op.gte]: start }
          },
          {
            startDate: { [Op.between]: [start, end] }
          },
          {
            endDate: { [Op.between]: [start, end] }
          }
        ]
      },
      transaction
    });
    
    if (overlappingBookings.length > 0) {
      await transaction.rollback();
      return res.status(409).json({ 
        error: 'Vehicle is not available for the selected dates',
        conflictingBookings: overlappingBookings
      });
    }
    
    // Calculate rental duration in days
    const durationMs = end.getTime() - start.getTime();
    const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
    
    // Calculate total price
    const totalPrice = durationDays * vehicle.dailyRate;
    
    // Create booking
    const booking = await Booking.create({
      firstName,
      lastName,
      vehicleId,
      startDate: start,
      endDate: end,
      totalPrice,
      status: 'confirmed'
    }, { transaction });
    
    await transaction.commit();
    
    res.status(201).json({
      message: 'Booking created successfully',
      booking,
      vehicle,
      rentalDuration: durationDays
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

export default router;