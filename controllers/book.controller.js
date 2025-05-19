const Book = require("../models/book.model");
const Review = require("../models/review.model");

const createBook = async (req, res) => {
  try {
    // Create a new book using the request body and attach the ID of the user who created it
    const book = new Book({ ...req.body, createdBy: req.user.id });
    const saved = await book.save();
    // Return the saved book with 201 status
    res.status(201).json(saved);
  } catch (err) {
    // Return an error if something goes wrong during book creation
    res.status(400).json({ message: "Error creating book" });
  }
};

const getAllBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;

  // Build a dynamic filter based on optional query params
  const filter = {};
  if (author) filter.author = new RegExp(author, "i");
  if (genre) filter.genre = new RegExp(genre, "i");

  try {
    // Find filtered books with pagination
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
    // Find book by ID
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Get all reviews for this book
    const reviews = await Review.find({ book: book._id });

    // Calculate average rating; avoid divide-by-zero
    const averageRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);
    // Return book details with ratings and reviews
    res.json({ book, averageRating, reviews });
  } catch (err) {
    res.status(500).json({ message: "Error fetching book" });
  }
};

// const searchBooks = async (req, res) => {
//   const { q } = req.query;
//   try {
//     // Search books where title or author matches the query (case-insensitive)
//     const books = await Book.find({
//       $or: [{ title: new RegExp(q, "i") }, { author: new RegExp(q, "i") }],
//     });
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ message: "Search error" });
//   }
// };

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
//   searchBooks,
};
