const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");


// create article + upload image
router.post('/', auth, upload.single("image"), async (req, res) => {
  try {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
      image: req.file ? req.file.filename : null
    });

    await article.save();
    res.json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// read all articles + show image + pagination & search
router.get('/', auth, async (req, res) => {
  try {
    let { page = 1, limit = 5, search = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const query = search
      ? { title: { $regex: search, $options: "i" } } // case insensitive
      : {};

    const articles = await Article.find(query)
      .populate("author", "email")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Article.countDocuments(query);
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    res.json({
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit),
      data: articles.map(a => ({
        ...a.toObject(),
        imageUrl: a.image ? `${baseUrl}${a.image}` : null
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update article
router.put("/:id", auth, async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      req.body,
      { new: true }
    );

    if (!article) return res.status(403).json({ message: "Not authorized!" });
    res.json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete article
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted!" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;