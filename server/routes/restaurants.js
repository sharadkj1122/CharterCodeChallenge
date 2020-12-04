const express = require("express");
const router = express.Router();
const rests = require("./restaurantsData.json");

router.get("/all", async (req, res) => {
  try {
    res.send(rests.data);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
});

module.exports = router;