const express = require("express");
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    res.json({
        message: "Welcome to protected post",
        user: req.user // hasil decode dari token
    })
})

module.exports = router;