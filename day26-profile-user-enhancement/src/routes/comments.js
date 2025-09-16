const express = require("express");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth");

const router = express.Router();

// Create comment
router.post("/:articleId", auth, async (req, res) => {
  try {
    const comment = new Comment({
      text: req.body.text,
      article: req.params.articleId,
      user: req.user.id,
    });
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get comments of an article
router.get("/:articleId", auth, async (req, res) => {
  const comments = await Comment.find({ article: req.params.articleId })
    .populate("user", "email")
    .populate("article", "title");
  res.json(comments);
});

module.exports = router;
