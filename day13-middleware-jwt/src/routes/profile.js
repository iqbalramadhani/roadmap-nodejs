const express = require("express");
const auth = require('../middleware/auth');

const router = express.Router();

// hanya bisa di akses kalau ada token
router.get('/', auth, async (req, res) => {
    res.json({
        message: "This is your profile",
        user: req.user // hasil decode dari token
    })
})

module.exports = router;