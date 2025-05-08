import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

const VehicleType = sequelize.define('VehicleType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wheelCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: [[2, 4]], // Only allow 2 or 4 wheels
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default VehicleType;