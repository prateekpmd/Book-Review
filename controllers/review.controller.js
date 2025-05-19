const Review = require('../models/review.model');

const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.id;

  try {
    const existing = await Review.findOne({ user: req.user.id, book: bookId });
    if (existing)
      return res.status(400).json({ message: 'You already reviewed this book' });

    const newReview = new Review({
      rating,
      comment,
      user: req.user.id,
      book: bookId,
    });

    const saved = await newReview.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error posting review' });
  }
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const review = await Review.findById(id);
    if (!review || review.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error updating review' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    await review.remove();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting review' });
  }
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};
