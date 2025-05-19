const Review = require("../models/review.model");

const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.id;

  try {
    // Check if the user already submitted a review for this book
    const existing = await Review.findOne({ user: req.user.id, book: bookId });
    if (existing)
      return res
        .status(400)
        .json({ message: "You already reviewed this book" });

    // Create and save the new review
    const newReview = new Review({
      rating,
      comment,
      user: req.user.id,
      book: bookId,
    });

    const saved = await newReview.save();
    res.status(201).json(saved); // Send back the saved review
  } catch (err) {
    res.status(500).json({ message: "Error posting review" });
  }
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const review = await Review.findById(id);

    // Only allow updating if the review exists and belongs to the user
    if (!review || review.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    // Update only if new values are provided
    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Error updating review" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    // Check ownership before deletion
    if (!review || review.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await review.deleteOne(); // Delete the review document
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};
