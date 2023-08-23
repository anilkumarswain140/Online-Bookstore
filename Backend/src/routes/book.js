var express = require('express');
var router = express.Router();
const bookController = require('../controllers/books')

router.post("/addbook", bookController.addBook);
router.get("/books", bookController.getBooks);
router.post("/removebook", bookController.deleteBook);
router.get("/search/:key", bookController.searchBook);
router.get("/filter", bookController.filter);
router.put("/updatebook", bookController.updateBookById)
module.exports = router;

