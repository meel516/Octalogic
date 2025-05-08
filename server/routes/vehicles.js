import express from 'express';
import Vehicle from '../models/Vehicle.js';
import VehicleType from '../models/VehicleType.js';

const router = express.Router();

// Get all vehicle types
router.get('/types', async (req, res) => {
  try {
    const wheelCount = req.query.wheels ? parseInt(req.query.wheels) : null;
    
    const whereClause = wheelCount ? { wheelCount } : {};
    
    const vehicleTypes = await VehicleType.findAll({
      where: whereClause,
      order: [['name', 'ASC']],
    });
    
    res.json(vehicleTypes);
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
});

// Get vehicles by type
router.get('/by-type/:typeId', async (req, res) => {
  try {
    const { typeId } = req.params;
    
    const vehicles = await Vehicle.findAll({
      where: { vehicleTypeId: typeId },
      include: [{ model: VehicleType }],
      order: [['make', 'ASC'], ['model', 'ASC']],
    });
    
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles by type:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

// Check vehicle availability
router.get('/:vehicleId/availability', async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Check if the vehicle exists
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    
    // Check for overlapping bookings
    const overlappingBookings = await sequelize.query(`
      SELECT * FROM Bookings
      WHERE vehicleId = :vehicleId
      AND (
        (startDate <= :endDate AND endDate >= :startDate) OR
        (startDate >= :startDate AND startDate <= :endDate) OR
        (endDate >= :startDate AND endDate <= :endDate)
      )
      AND status = 'confirmed'
    `, {
      replacements: { vehicleId, startDate: start, endDate: end },
      type: sequelize.QueryTypes.SELECT,
    });
    
    const isAvailable = overlappingBookings.length === 0;
    
    res.json({ 
      isAvailable,
      vehicle
    });
  } catch (error) {
    console.error('Error checking vehicle availability:', error);
    res.status(500).json({ error: 'Failed to check availability' });
  }
});

export default router;