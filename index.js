const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // For environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection string
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
