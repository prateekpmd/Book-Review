const express = require('express');
const router = express.Router();
const {
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/review.controller');

const authMiddleware = require('../middleware/auth.middleware');

router.post('/books/:id/reviews', authMiddleware, createReview);
router.put('/reviews/:id', authMiddleware, updateReview);
router.delete('/reviews/:id', authMiddleware, deleteReview);

module.exports = router;
