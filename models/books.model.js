const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publishedYear: { type: Number },
    coverImage: { type: String }, // Store image URL or file path
    isRented: { type: Boolean, default: false }, // Check if book is rented
    rentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
