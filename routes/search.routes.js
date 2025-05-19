const express = require('express');
const router = express.Router();
const { searchBooks } = require('../controllers/search.controller');


//To Search a book based on author and title
router.get('/', searchBooks);

module.exports = router;
