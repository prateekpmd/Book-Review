const express = require('express');
const router = express.Router();
const {
  createBook,
  getAllBooks,
  getBookById,
  searchBooks
} = require('../controllers/book.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, createBook);
router.get('/', getAllBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);

module.exports = router;
