const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 5 },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // users who liked
    category: { type: String },          // kategori tunggal
    tags: [{ type: String }]             // banyak tag
}, { timestamps: true });

module.exports = mongoose.model("Article", ArticleSchema);
