const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    rentedAt: { type: Date, default: Date.now },
    returnedAt: { type: Date, default: null }, // Null means not returned yet
});

module.exports = mongoose.model('Rental', rentalSchema);
