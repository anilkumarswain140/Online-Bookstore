var express = require('express');
var router = express.Router();
var Book = require('../models/books');


router.post("/addbook", async (req, res) => {
    console.log(req.body.authers);
    const user = await Book.create({
        title: req.body.title,
        authers: req.body.authers,
        description: req.body.description,
        thumbnailUrl: req.body.thumbnailUrl,
        category: req.body.category,
        rating: req.body.rating,
        review: req.body.review,
        price: req.body.price
    });

    return res.status(200).json(user);
});

router.get("/books", async (req, res) => {
    const users = await Book.find();
        if (!users) {
            return res.status(400).json({ error: "No users found" })
        }
        return res.status(200).json(users)
    })


module.exports = router;

