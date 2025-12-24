const express = require("express");
const Image = require("../models/Image");
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

/* =========================
   Upload Image (FILE)
========================= */
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "creative-showcase",
    });

    // Save image metadata in MongoDB
    const image = await Image.create({
      userId: req.user.userId,
      username: req.user.username,
      title: req.body.title || "",
      imageUrl: result.secure_url,
    });

    res.json({
      message: "Image uploaded successfully",
      image,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: "Image upload failed" });
  }
});

/* =========================
   Get Logged-in User Images
========================= */
router.get("/my", auth, async (req, res) => {
  try {
    const images = await Image.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });

    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

/* =========================
   Public Profile Images
========================= */
router.get("/user/:username", async (req, res) => {
  try {
    const images = await Image.find({
      username: req.params.username,
    }).sort({ createdAt: -1 });

    res.json(images);
  } catch (err) {
    console.error("PUBLIC PROFILE ERROR:", err);
    res.status(500).json({ error: "Failed to load user images" });
  }
});

/* =========================
   Random Images (Landing)
========================= */
router.get("/random", async (req, res) => {
  try {
    const images = await Image.aggregate([{ $sample: { size: 20 } }]);
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to load images" });
  }
});

module.exports = router;
