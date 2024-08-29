const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
var cors = require('cors')


const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors())

// MongoDB connection string
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));

//  routes
app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.use('/api/users', require('./routes/user'));
app.use('/api/locations', require('./routes/location'));
app.use('/api/notifications', require('./routes/notification'));
app.use('/api/measurements', require('./routes/measurement'));


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
