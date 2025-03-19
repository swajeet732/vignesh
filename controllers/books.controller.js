const bookService = require('../services/books.service');
const sendResponse = require("../response/sendresponse");

// ✅ Create Book Controller
exports.createBook = async (req, res) => {
    try {
        const book = await bookService.createBook(req.body);
        sendResponse(res, 201, true, "Book created successfully", book);
    } catch (error) {
        sendResponse(res, 500, false, "Error creating book", {}, [error.message]);
    }
};

// ✅ Get Books with Pagination & Filtering
exports.getBooks = async (req, res) => {
    try {
        const books = await bookService.getBooks(req.query);
        sendResponse(res, 200, true, "Books fetched successfully", { total: books.length, books });
    } catch (error) {
        sendResponse(res, 500, false, "Error fetching books", {}, [error.message]);
    }
};

// ✅ Get Single Book
exports.getBookById = async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        if (!book) return sendResponse(res, 404, false, "Book not found");

        sendResponse(res, 200, true, "Book fetched successfully", book);
    } catch (error) {
        sendResponse(res, 500, false, "Error fetching book", {}, [error.message]);
    }
};

// ✅ Update Book
exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await bookService.updateBook(req.params.id, req.body);
        if (!updatedBook) return sendResponse(res, 404, false, "Book not found");

        sendResponse(res, 200, true, "Book updated successfully", updatedBook);
    } catch (error) {
        sendResponse(res, 500, false, "Error updating book", {}, [error.message]);
    }
};

// ✅ Delete Book
exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await bookService.deleteBook(req.params.id);
        if (!deletedBook) return sendResponse(res, 404, false, "Book not found");

        sendResponse(res, 200, true, "Book deleted successfully");
    } catch (error) {
        sendResponse(res, 500, false, "Error deleting book", {}, [error.message]);
    }
};
