const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
var cors = require("cors");
const { default: axios } = require("axios");

const PORT = process.env.PORT || 5000;

const corsOptions = {
  // origin: ["http://localhost:5173", "http://localhost:5174"],
  origin: ["https://nasa-space-app-geosync.web.app"],
  credentials: true,
  optionSuccessStatus: 200,
};

// Middleware to parse JSON
app.use(cors(corsOptions));
app.use(express.json());
// app.use(cors());

// MongoDB connection string
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

//  routes
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// app.use("/api", require("./routes/landsat"));
app.get("/landsat8", async (req, res) => {
  // we will receive dynamic latitude and longitude from user
  const latitude = 23.710394;
  const longitude = 90.407109;
  try {
    const response = await axios.get(
      `https://api.n2yo.com/rest/v1/satellite/positions/${process.env.NORAD_ID}/${latitude}/${longitude}/0/30/&apiKey=${process.env.LANDSAT_8_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/api/users", require("./routes/user"));
app.use("/api/locations", require("./routes/location"));
app.use("/api/notifications", require("./routes/notification"));
app.use("/api/measurements", require("./routes/measurement"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
