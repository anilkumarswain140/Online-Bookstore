var express = require('express');
var router = express.Router();
const bookController = require('../controllers/books')

router.post("/books", bookController.addBook);
router.get("/books", bookController.getBooks);
router.post("/book/:id", bookController.deleteBook);
router.get("/books/search/:key", bookController.searchBook);
router.get("/books/filter", bookController.filter);
router.put("/books", bookController.updateBookById);
router.get("/books/:id", bookController.findBookById);
module.exports = router;

