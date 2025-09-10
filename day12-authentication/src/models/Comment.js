const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: { type: String, required: true, minlength: 1},
    article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" }  // relasi ke artikel
}, { timestamps: true });

module.exports = mongoose.model("Comment",CommentSchema);