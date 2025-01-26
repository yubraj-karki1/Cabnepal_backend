
// controllers/driveController.js
const Drive = require('../models/Drive');
const { validationResult } = require('express-validator');

const driveController = {
    createDrive: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const drive = await Drive.create(req.body);
            res.status(201).json(drive);
        } catch (error) {
            res.status(500).json({ message: 'Error creating drive', error });
        }
    },
    getDrives: async (req, res) => {
        try {
            const drives = await Drive.findAll();
            res.json(drives);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching drives', error });
        }
    },
    getDriveById: async (req, res) => {
        try {
            const drive = await Drive.findByPk(req.params.id);
            if (!drive) return res.status(404).json({ message: 'Drive not found' });
            res.json(drive);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching drive', error });
        }
    },
    updateDrive: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const drive = await Drive.findByPk(req.params.id);
            if (!drive) return res.status(404).json({ message: 'Drive not found' });
            await drive.update(req.body);
            res.json(drive);
        } catch (error) {
            res.status(500).json({ message: 'Error updating drive', error });
        }
    },
    deleteDrive: async (req, res) => {
        try {
            const drive = await Drive.findByPk(req.params.id);
            if (!drive) return res.status(404).json({ message: 'Drive not found' });
            await drive.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting drive', error });
        }
    },
};

module.exports = driveController;