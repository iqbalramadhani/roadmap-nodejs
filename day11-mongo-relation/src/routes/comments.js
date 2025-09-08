const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// GET semua komentar
router.get('/', async (req, res) => {
    const comments = await Comment.find().populate('article'); //populate = ambil detail artikel
    res.json(comments);
})

// POST buat komentar baru
router.post('/', async (req, res) => {
    try {
        const { text, articleId } = req.body;
        const comment = new Comment({ text, article: articleId});
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: err.message})
    }
});

module.exports = router;