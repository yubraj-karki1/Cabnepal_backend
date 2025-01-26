const express = require('express');
const { body } = require('express-validator');
const driveController = require('../controllers/driveController');
const authenticate = require('../middleware/authenticate'); // Adjust path

const driveRoutes = express.Router();

driveRoutes.post(
    '/',
    authenticate,
    [
        body('driverName').isString().notEmpty(),
        body('vehicleType').isString().notEmpty(),
        body('registrationNumber').isString().notEmpty(),
        body('capacity').isInt({ gt: 0 }),
        body('location').isString().notEmpty(),
    ],
    driveController.createDrive
);

driveRoutes.get('/', authenticate, driveController.getDrives);
driveRoutes.get('/:id', authenticate, driveController.getDriveById);
driveRoutes.put(
    '/:id',
    authenticate,
    [
        body('driverName').optional().isString(),
        body('vehicleType').optional().isString(),
        body('registrationNumber').optional().isString(),
        body('capacity').optional().isInt({ gt: 0 }),
        body('location').optional().isString(),
    ],
    driveController.updateDrive
);
driveRoutes.delete('/:id', authenticate, driveController.deleteDrive);

module.exports = driveRoutes;