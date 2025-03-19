const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rental.controller');
const authMiddleware = require('../middleware/auth');

router.post('/rent/:bookId', authMiddleware, rentalController.rentBook);
router.post('/return/:bookId', authMiddleware, rentalController.returnBook);

module.exports = router;
