var Book = require('../models/books');
const auth = require('../auth/auth');

const addBook = async (req, res, next) => {
    console.log(req.body.authers);
    const verifyed = auth.verifyToken(req.headers.authorization);
    if (verifyed == undefined || verifyed == null || verifyed == "") {
        return res.status(401).json({ error: "unatherized" })
    }
    else {
        const user = await Book.create({
            title: req.body.title,
            authers: req.body.authers,
            shortDescription: req.body.shortDescription,
            thumbnailUrl: req.body.thumbnailUrl,
            category: req.body.category,
            rating: req.body.rating,
            review: req.body.review,
            price: req.body.price
        });

        return res.status(200).json(user);
    }
}

const getBooks = async (req, res, next) => {
    const pageOptions = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseInt(req.query.limit, 6) || 6
    }
    const verifyed = auth.verifyToken(req.headers.authorization);
    if (verifyed == undefined || verifyed == null || verifyed == "") {
        return res.status(401).json({ error: "unatherized" })
    }
    else {
        const Books = await Book.find()
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .then(function (book, err) {
                res.status(200).json(book);
            });
    }
}

const searchBook = async (req, res, next) => {
    // Book.createIndex({title :"text",authers :"text"});
    const records = await Book.find(
        {
            "$or": [
                { title: { $regex: req.params.key, $options: 'i' } },
                { authers: { $regex: req.params.key } }
            ]
        });
    res.status(200).json({ records });
}

const filter = async (req, res, next) => {
    console.log(req.query.min);
    let sort = req.query.sort;
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
        sortBy[sort[0]] = sort[1];
    } else {
        sortBy[sort[0]] = "asc";
    }
    const records = await Book.find({
        // "rating":{"$gt": req.query.from}},{"rating":{"$lte":req.query.to},
        "$or":
            [
                { "$and": [{ "price": { "$gt": req.query.min } }, { "price": { "$lte": req.query.max } }] },

            ]
    }).sort(sortBy)

    res.status(200).json({ records });
}

const deleteBook = async (req, res, next) => {
    const verifyed = auth.verifyToken(req.headers.authorization);
    if (verifyed == undefined || verifyed == null || verifyed == "") {
        return res.status(401).json({ error: "unatherized" })
    }
    else {
        const query = { _id: req.query.id }
        const result = await Book.findOneAndRemove(query);
        console.log(result);
        if (result.deletedCount === 1) {
            res.status(200).json({ result });
        }
        else {
            res.status(400).json({ error: "bad request" })
        }
    }
}

const updateBookById = async (req, res, next) => {
    const filter = { _id: req.query.id };
    const update = {
        title: req.body.title,
        authers: req.body.authers,
        shortDescription: req.body.shortDescription,
        thumbnailUrl: req.body.thumbnailUrl,
        category: req.body.category,
        rating: req.body.rating,
        review: req.body.review,
        price: req.body.price
    };
    try {
        if (!filter || !update) {
            return res.status(400).json({ error: 'null id found' });
        }

        const doc = await Book.findOneAndUpdate(filter, update, {
            returnOriginal: false
        });
        if (!doc) {
            return res.status(404).json({ error: 'record not updated' });
        }
        res.status(200).json({ doc });
    } catch (error) {
        res.status(500).json({ error: 'Could not update record' });
    }
}

module.exports = {
    addBook,
    getBooks,
    deleteBook,
    searchBook,
    filter,
    updateBookById
}
