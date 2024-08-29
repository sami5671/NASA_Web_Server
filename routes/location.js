const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const User = require('../models/User');

// Add a new location
router.post('/add', async (req, res) => {
    try {
        const { userId, name, coordinates } = req.body;
        const location = new Location({ userId, name, coordinates });
        await location.save();

        // Add location to user
        await User.findByIdAndUpdate(userId, { $push: { locations: location._id } });

        res.status(201).json({ message: 'Location added successfully', location });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all locations for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const locations = await Location.find({ userId: req.params.userId });
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
