const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");
const Comment = require("../models/Comment");
const fs = require("fs");
const path = require("path");


// create article + upload image
router.post('/', auth, upload.array("images", 5), async (req, res) => {
  try {
    const files = req.files.map(file => file.filename);

    const tags = req.body.tags ? req.body.tags.split(",").map(t => t.trim()) : [];


    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
      image: files,
      tags,
      category: req.body.category
    });

    await article.save();

    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;

    res.json({
      ...article.toObject(),
      imageUrls: files.map(f => baseUrl + f)
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// read all articles + show image + pagination & search
router.get('/', auth, async (req, res) => {
  try {
    let { page = 1, limit = 5, search = "", sortBy = "createdAt", order = "desc", author, category, tag } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // Filter + Search
    let query = {};
    if (search) query.title = { $regex: search, $options: "i" };
    
    if (author) query.author = author; // filter by authorId

    if(category) query.category = category;
    
    if(tag) query.tags = tag;

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
        imageUrl: a.image.map(img => `${baseUrl}${img}`)
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Popular articles
router.get("/popular", async (req, res) => {
  try {
    // Ambil semua artikel
    const articles = await Article.find().populate("author", "email");    

    // Hitung popularity score (likes + comments)
    const articlesWithStats = await Promise.all(
      articles.map(async (a) => {
        const commentCount = await Comment.countDocuments({ article: a._id });
        return {
          ...a.toObject(),
          likesCount: a.likes.length,
          commentCount,
          popularity: a.likes.length + commentCount
        };
      })
    );

    // Urutkan berdasarkan popularity (desc)
    articlesWithStats.sort((a, b) => b.popularity - a.popularity);

    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;

    console.log(articlesWithStats);
    

    res.json(
      articlesWithStats.map((a) => ({
        ...a,
        imageUrls: a.images?.map((img) => `${baseUrl}${img}`)
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update article
router.put("/:id", auth, upload.array("images", 5), async (req, res) => {
  try {

    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found!" });

    // hanya author boleh update
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    console.log(req.body);


    // update data
    if (req.body.title) article.title = req.body.title;
    if (req.body.content) article.content = req.body.content;

    // kalau ada gambar baru ditambahkan ke array
    if (req.files.length > 0) {
      const newFiles = req.files.map(file => file.filename);
      article.image.push(...newFiles);
    }

    await article.save();

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
    res.json({
      ...article.toObject(),
      imageUrl: article.image.map(img => baseUrl + img)
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete article
router.delete("/:id", auth, async (req, res) => {
  try {

    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found!" });

    // hanya author boleh update
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    // hapus file gambar
    article.image.forEach(img => {
      const filePath = path.join(__dirname, "..", "uploads", img);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    })

    await article.deleteOne();

    res.json({ message: "Article deleted!" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// delete spesific image
router.delete("/:id/image/:filename", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) return res.status(404).json({ error: "Article not found!" });

    // hanya author boleh update
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    const { filename } = req.params;

    // cek apakah ada gambar
    if (!article.image.includes(filename)) {
      return res.status(404).json({ error: "Image not found!" });
    }

    // hapus file fisik
    const filePath = path.join(__dirname, "..", "uploads", filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // hapus dari array
    article.image = article.image.filter(img => img !== filename);
    await article.save();

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    res.json({
      message: "Image deleted!",
      images: article.image,
      imageUrl: article.image.map(img => baseUrl + img)
    })

  } catch (error) {
    res.status(500).json({ error: error.message });
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