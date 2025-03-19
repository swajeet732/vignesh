const Rental = require('../models/rental.model');
const Book = require('../models/books.model');

// ✅ Rent a Book
exports.rentBook = async (userId, bookId) => {
    const book = await Book.findById(bookId);
    if (!book || book.isRented) throw new Error("Book is not available for rent");

    const existingRental = await Rental.findOne({ userId, returnedAt: null });
    if (existingRental) throw new Error("User already rented a book");

    book.isRented = true;
    await book.save();

    return await new Rental({ userId, bookId }).save();
};

// ✅ Return a Book
exports.returnBook = async (userId, bookId) => {
    const rental = await Rental.findOne({ userId, bookId, returnedAt: null });
    if (!rental) throw new Error("No active rental found for this user");

    rental.returnedAt = new Date();
    await rental.save();

    const book = await Book.findById(bookId);
    book.isRented = false;
    await book.save();

    return rental;
};
