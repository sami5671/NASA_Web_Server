const express = require('express');
const router = express.Router();
const Measurement = require('../models/Measurement');

// Add a new measurement
router.post('/add', async (req, res) => {
    try {
        const { userId, locationId, measurementDate, spectralData } = req.body;
        const measurement = new Measurement({ userId, locationId, measurementDate, spectralData });
        await measurement.save();
        res.status(201).json({ message: 'Measurement added successfully', measurement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get measurements for a location
router.get('/location/:locationId', async (req, res) => {
    try {
        const measurements = await Measurement.find({ locationId: req.params.locationId });
        res.status(200).json(measurements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
