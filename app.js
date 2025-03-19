const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Import Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const userRouter = require('./routes/users.routes');
const bookRouter = require('./routes/books.routes');
const rentRouter = require('./routes/rental.routes');

// Initialize Express App
const app = express();

// Connect to MongoDB
(async () => {
    try {
        await connectDB();
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1); // Exit if DB connection fails
    }
})();

// Middleware
app.use(cors()); // Enable CORS
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Debugging Middleware
app.use((req, res, next) => {
    console.log(`📌 Incoming Request: ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', userRouter);
app.use('/api', bookRouter);
app.use('/api', rentRouter);

// 404 Not Found Middleware
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route Not Found' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

module.exports = app;
