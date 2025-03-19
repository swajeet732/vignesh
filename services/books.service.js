const Book = require('../models/books.model');

// ✅ Create a new book
exports.createBook = async (bookData) => {
    const book = new Book(bookData);
    return await book.save();
};

// ✅ Get all books with Pagination & Filtering
exports.getBooks = async ({ page = 1, limit = 10, genre, author }) => {
    const filter = {};
    if (genre) filter.genre = genre;
    if (author) filter.author = new RegExp(author, 'i'); // Case-insensitive search

    return await Book.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit));
};

// ✅ Get a single book by ID
exports.getBookById = async (bookId) => {
    return await Book.findById(bookId);
};

// ✅ Update a book
exports.updateBook = async (bookId, bookData) => {
    return await Book.findByIdAndUpdate(bookId, bookData, { new: true });
};

// ✅ Delete a book
exports.deleteBook = async (bookId) => {
    return await Book.findByIdAndDelete(bookId);
};
