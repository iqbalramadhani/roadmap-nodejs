const express = require("express");
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', auth, admin, async (req, res) => {
    res.json({
        message: "Welcome to admin dashboard",
        user: req.user // hasil decode dari token
    })
})

module.exports = router;