router.post('/books', auth, createBook);
router.get('/books', listBooks); // with filters
router.get('/books/:id', getBookDetails);
router.post('/books/:id/reviews', auth, addReview);
