const express = require("express");
const User = require("../models/User");
const Image = require("../models/Image");

const router = express.Router();

router.get("/:username/images", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const images = await Image.find({ userId: user._id });
    res.json({ username: user.username, images });
  } catch (err) {
    res.status(500).json({ error: "Failed to load profile" });
  }
});

module.exports = router;
