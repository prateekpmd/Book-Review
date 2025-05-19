const Book = require('../models/book.model');

const searchBooks = async (req, res) => {
  try {
    const query = req.query.query || '';
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } }
      ]
    });

    res.status(200).json({ results: books });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { searchBooks };
