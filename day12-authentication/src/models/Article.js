const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 5 },
    author: { type: String, required: true, minlength: 3 },
}, { timestamps: true });

module.exports = mongoose.model("Article", ArticleSchema);
