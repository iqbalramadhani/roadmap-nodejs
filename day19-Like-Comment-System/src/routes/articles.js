const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");
const Comment = require("../models/Comment");


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
    let { page = 1, limit = 5, search = "", sortBy = "createdAt", order = "desc", author } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // Filter + Search
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (author) {
      query.author = author; // filter by authorId
    }

    // Sorting
    const sortOrder = order === "asc" ? 1 : -1;
    const sortQuery = { [sortBy]: sortOrder };

    const articles = await Article.find(query)
      .populate("author", "email")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sortQuery);

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

// Toggle like/unlike
router.post('/:id/like', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)

    if (!article) return res.status(404).json({ error: "Article not found!" });

    const userId = req.user.id
    const index = article.likes.indexOf(userId)

    if (index === -1) {
      article.likes.push(userId) //like
    } else {
      article.likes.splice(index, 1) //unlike
    }

    await article.save()
    res.json({ like: article.likes.length })
  } catch (error) {
    ress.status(500).json({ error: error.message });
  }
});


// Add comment
router.post("/:id/comments", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found" });

    const comment = new Comment({
      text: req.body.text,
      author: req.user.id,
      article: article._id
    });

    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get comments
router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ article: req.params.id })
      .populate("author", "email")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;