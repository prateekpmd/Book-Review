const express = require('express');
const app = express();
require('dotenv').config();

// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const reviewRoutes = require('./routes/review.routes');
const searchRoutes = require('./routes/search.routes.js');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api', reviewRoutes); // for /books/:id/reviews, /reviews/:id
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
  res.send('📚 Book Review API is running!');
});

module.exports = app;
