var mongoose = require('mongoose');
var Schema = mongoose.Schema;

bookSchema = new Schema( {
	
	unique_id: Number,
	title: String,
	authers : String,
    shortDescription : String,
    thumbnailUrl : String,
    category :String,
    rating : Number,
    review : String,
    price : Number


},{ collection: 'books' }),
Book = mongoose.model('book', bookSchema);

module.exports = Book;