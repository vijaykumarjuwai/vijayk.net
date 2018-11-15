const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    category: { type: String, required: true },
    comments: [{ body: String, date: { type: Date, default: Date.now }, userName: String }],
    date: { type: Date, default: Date.now },
    hidden: Boolean
});

module.exports = mongoose.model('Blog', blogSchema);
