const Book = require("../models/book.model");
const Review = require("../models/review.model");

const createBook = async (req, res) => {
  try {
    const book = new Book({ ...req.body, createdBy: req.user.id });
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error creating book" });
  }
};

const getAllBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, "i");
  if (genre) filter.genre = new RegExp(genre, "i");

  try {
    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const reviews = await Review.find({ book: book._id });
    const averageRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

    res.json({ book, averageRating, reviews });
  } catch (err) {
    res.status(500).json({ message: "Error fetching book" });
  }
};

const searchBooks = async (req, res) => {
  const { q } = req.query;
  try {
    const books = await Book.find({
      $or: [{ title: new RegExp(q, "i") }, { author: new RegExp(q, "i") }],
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Search error" });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  searchBooks,
};
