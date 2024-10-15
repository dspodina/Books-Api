import express from 'express';
import booksControllers from '../controllers/books.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

const {
    getAllBooks,
    getBookById,
    addBookForm,
    addBook,
    updateBookForm,
    updateBook,
    deleteBook
} = booksControllers;

// routes
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.get('/add-book', verifyToken, addBookForm);
router.post('/add-book', verifyToken, addBook);
router.get('/update-book/:id', updateBookForm);
router.post('/update-book/:id', updateBook);
router.get('/delete/:id', verifyToken, deleteBook);

export default router;
