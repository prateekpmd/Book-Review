const express = require('express');
const router = express.Router();
const {
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/review.controller');

const authMiddleware = require('../middleware/auth.middleware');
//To create a Review
router.post('/books/:id/reviews', authMiddleware, createReview);

//To Edit the Review
router.put('/reviews/:id', authMiddleware, updateReview);

//To delete the Review
router.delete('/reviews/:id', authMiddleware, deleteReview);

module.exports = router;
