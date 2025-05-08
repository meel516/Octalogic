import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';
import Vehicle from './Vehicle.js';

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'confirmed',
    validate: {
      isIn: [['confirmed', 'cancelled', 'completed']],
    }
  }
}, {
  timestamps: true,
});

// Define association
Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId' });
Vehicle.hasMany(Booking, { foreignKey: 'vehicleId' });

export default Booking;