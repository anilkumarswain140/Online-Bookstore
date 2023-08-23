var mongoose = require('mongoose');
var Schema = mongoose.Schema;

bookSchema = new Schema( {
	
	unique_id: Number,
	title: String,
	authers : [{type:String}],
    shortDescription : String,
    thumbnailUrl : String,
    category : [{type:String}],
    rating : Number,
    review : [{type:String}],
    price : Number


},{ collection: 'books' }),
Book = mongoose.model('book', bookSchema);

module.exports = Book;