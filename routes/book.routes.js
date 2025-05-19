const express = require('express');
const router = express.Router();
const {
  createBook,
  getAllBooks,
  getBookById,
  searchBooks
} = require('../controllers/book.controller');

const authMiddleware = require('../middleware/auth.middleware');

//To create a Book
router.post('/', authMiddleware, createBook);

//To get all Books
router.get('/get', getAllBooks);

//To search for a Book
// router.get('/search', searchBooks);

//Get Single Book
router.get('/single/:id', getBookById);

module.exports = router;
