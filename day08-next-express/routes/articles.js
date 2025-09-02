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

// GET /articles/:id
router.get("/:id", (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });
  res.json(article);
});

// GET /articles/search?author=Iqbal
router.get("/search", (req, res) => {
  const author = req.query.author;
  const result = articles.filter((a) => a.author.toLowerCase() === author.toLowerCase());
  res.json(result);
});

// POST /articles
router.post("/", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title dan Author wajib diisi" });
  }

  // validasi panjang karakter
  if (title.length < 5) {
    return res.status(400).json({ message: "Title minimal 5 karakter" });
  }
  if (author.length < 3) {
    return res.status(400).json({ message: "Author minimal 3 karakter" });
  }

  const newArticle = {
    id: articles.length + 1,
    title,
    author,
  };

  articles.push(newArticle);
  res.status(201).json(newArticle);
});

module.exports = router;
