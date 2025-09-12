const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 5 },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Article", ArticleSchema);
