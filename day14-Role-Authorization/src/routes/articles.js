const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// GET all
router.get("/", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

// GET by ID
router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });
  res.json(article);
});

// POST create
router.post("/", async (req, res) => {
  try {
    const { title, author } = req.body;
    const article = new Article({ title, author });
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update
router.put("/:id", async (req, res) => {
  try {
    const { title, author } = req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { title, author },
      { new: true }
    );
    if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });
    res.json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });
  res.json({ message: "Artikel berhasil dihapus" });
});

module.exports = router;
