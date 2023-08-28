const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
  },
  quantity: {
    type: Number,
    default: 0,
  },
  producttitle: {
    type: String,
    default: '',
  },
  productimage: {
    type: String,
    default: '',
  },
  productprice: {
    type: String,
    default: '',
  },
  total: {
    type: Number,
    default: 0,
  },
});

const orderSchema = mongoose.Schema({
  products: [itemSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  subtotal: {
    type: Number,
    default: 0,
  },
  __v: { type: Number, select: false },
}, { collection: 'orders' });

Order = mongoose.model('Order', orderSchema);

module.exports = Order;