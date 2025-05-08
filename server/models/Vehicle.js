import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';
import VehicleType from './VehicleType.js';

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  make: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  licensePlate: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dailyRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: true,
});

// Define association
Vehicle.belongsTo(VehicleType, { foreignKey: 'vehicleTypeId' });
VehicleType.hasMany(Vehicle, { foreignKey: 'vehicleTypeId' });

export default Vehicle;