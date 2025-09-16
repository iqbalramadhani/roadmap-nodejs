const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, minlength: 6},
    role: { type: String, enum: ["user", "admin"], default:"user" },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);