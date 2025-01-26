// models/Drive.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path to your sequelize instance

const Drive = sequelize.define('Drive', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    driverName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registrationNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'drives',
    timestamps: true,
});
 module.exports=Drive;
