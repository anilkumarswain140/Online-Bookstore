var express = require('express');
var env = require('dotenv').config()
// var ejs = require('ejs');
var path = require('path');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const jwt = require('jsonwebtoken');

mongoose.connect("mongodb+srv://sunilkumarswain89:Anilks123@cluster0.rn3icmf.mongodb.net/onlinebookstore?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true } )

.then(() => console.log('Connected Successfully'))

.catch((err) => { console.error(err); });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});
app.use(cors());
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var index = require('./src/routes/index');
var book = require('./src/routes/book');
var cart = require('./src/routes/cart');

app.use('/', index);
app.use('/',book);
app.use('/',cart);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:'+PORT);
});