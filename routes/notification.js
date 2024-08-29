const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get notifications for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mark a notification as sent
router.put('/:id/markSent', async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { notificationSent: true });
        res.status(200).json({ message: 'Notification marked as sent' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
