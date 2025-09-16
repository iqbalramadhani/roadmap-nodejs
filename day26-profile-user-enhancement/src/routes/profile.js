const express = require("express");
const auth = require('../middleware/auth');
const User = require("../models/User");
const Article = require("../models/Article");

const router = express.Router();

// hanya bisa di akses kalau ada token
router.get('/', auth, async (req, res) => {
    res.json({
        message: "This is your profile",
        user: req.user // hasil decode dari token
    })
})

// profile 
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({ error: "User not found!" });

        // ambil artikel user
        const articles = await Article.find({ author: req.user.id})

        // ambil artikel yang di like user
        const likedArticles = await Article.find({ likes: req.user.id })

        res.json({
            user,
            starts:{
                totalArticles: articles.length,
                likedArticles: likedArticles.length
            },
            likedArticles,
            articles
        })
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// profile user lain
router.get('/:id', auth, async (req, res) => {
    try {        
        const user = await User.findById(req.params.id).select("-password");
        if(!user) return res.status(404).json({ error: "User not found!" });

        const articles = await Article.find({ author: req.params.id})

        const likedArticles = await Article.find({ likes: req.params.id })

        res.json({
            user,
            starts:{
                totalArticles: articles.length,
                likedArticles: likedArticles.length
            },
            likedArticles,
            articles
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;