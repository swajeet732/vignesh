const rentalService = require('../services/rental.service');
const sendResponse = require("../response/sendresponse");

// ✅ Rent a Book
exports.rentBook = async (req, res) => {
    try {
        const rental = await rentalService.rentBook(req.user.id, req.params.bookId);
        sendResponse(res, 201, true, "Book rented successfully", rental);
    } catch (error) {
        sendResponse(res, 400, false, error.message, {}, [error.message]);
    }
};

// ✅ Return a Book
exports.returnBook = async (req, res) => {
    try {
        const rental = await rentalService.returnBook(req.user.id, req.params.bookId);
        sendResponse(res, 200, true, "Book returned successfully", rental);
    } catch (error) {
        sendResponse(res, 400, false, error.message, {}, [error.message]);
    }
};
