const mongoose = require('mongoose');

const MeasurementSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true,
    },
    measurementDate: {
        type: Date,
        required: true,
    },
    spectralData: {
        type: Map,
        of: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Measurement', MeasurementSchema);
