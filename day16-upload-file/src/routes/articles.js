const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");


// create article + upload image
router.post('/', auth, upload.single("image") ,async(req,res) => {
  try{
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
      image: req.file ? req.file.filename : null
    });

    await article.save();
    res.json(article);
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
});

// read all articles + show image
router.get('/', auth, async(req,res) => {
  const articles = await Article.find().populate('author',"email role");
  const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

  res.json(
    articles.map(a => ({
      ...a.toObject(),
      imageUrl: a.image ? `${baseUrl}${a.image}` : null
    }))
  );
});

// update article
router.put("/:id", auth, async(req,res) => {
  try{
    const article = await Article.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      req.body,
      { new: true }
    );

    if(!article) return res.status(403).json({ message: "Not authorized!" });
    res.json(article);
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
});

// delete article
router.delete("/:id", auth, admin, async(req,res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted!" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;