const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // cek kalau email sudah ada
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'Email sudah terdaftar!' });

        // has password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // simpan user baru
        user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: 'User berhasil ditambahkan!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // cek user ada
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Email tidak ditemukan!' });

        // cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Password salah!' });

        // generate token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            "SECRET_KEY",
            { expiresIn: "1h" }
        )

        res.json({ message: 'Login berhasil!', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
