const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    people: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pickUpTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dropTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Booking;
