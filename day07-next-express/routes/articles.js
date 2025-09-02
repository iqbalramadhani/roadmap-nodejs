const express = require("express");
const router = express.Router();

const articles = [
  { id: 1, title: "Belajar Node.js", author: "Iqbal" },
  { id: 2, title: "Belajar Express", author: "Sakinah" },
  { id: 3, title: "Belajar API", author: "Iqbal" },
];

// GET /articles
router.get("/", (req, res) => {
  res.json(articles);
});

// GET /articles/search?author=Iqbal
router.get("/search", (req, res) => {
  const author = req.query.author;
  const result = articles.filter((a) => a.author.toLowerCase() === author.toLowerCase());
  res.json(result);
});

// GET /articles/:id
router.get("/:id", (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });
  res.json(article);
});


module.exports = router;
