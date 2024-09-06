const express = require("express");
const router = express.Router();

// get the landsat8 visual-passes

router.get("/landsat8", async (req, res) => {
  // we will receive dynamic latitude and longitude from user
  const latitude = 23.710394;
  const longitude = 90.407109;
  try {
    const response = await axios.get(
      `https://api.n2yo.com/rest/v1/satellite/visualpasses/${process.env.NORAD_ID}/${latitude}/${longitude}/0/2/300/&apiKey=${process.env.LANDSAT_8_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
