const { isValidObjectId } = require("mongoose");
var Cart = require("../models/cart");
var User = require('../models/user');
var Book = require('../models/books')
var mongoose = require('mongoose');
exports.addItemToCart = async (req, res) => {
  let userId = req.params.userId;
  console.log(req.params.userId,req.body.productId);
  let user = await User.exists({ _id: userId });
  let body;
  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let productId = req.body.productId;
  if (!productId)
    return res.status(400).send({ status: false, message: "Invalid product" });

  let cart = await Cart.findOne({ userId: userId });
  let _id ={ _id: new mongoose.Types.ObjectId(req.body.productId) };
  const doc = await Book.findById(_id);

  console.log("product details",doc);
   body = {
    productId : req.body.productId,
    producttitle : doc.title,
    productimage : doc.thumbnailUrl,
    productprice : doc.price,
    quantity: 1,
    rating: doc.rating,
    total : doc.price
    
  }
  if (cart) {
    console.log(cart);
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);
    
    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      productItem.quantity += 1;
      cart.products[itemIndex] = productItem;
    } else {
      cart.products.push(body);
    }
    cart = await cart.save();
    return res.status(200).send({ status: true, cartItems: cart });
  } else {
    const newCart = await Cart.create({
      userId,
      products: [body],
    });

    return res.status(201).send({ status: true, cartItems: newCart });
  }
};

exports.getCart = async (req, res) => {
  let userId = req.params.userId;
  let user = await User.exists({ _id: userId });

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let cart = await Cart.findOne({ userId: userId });
  if (!cart)
    return res
      .status(404)
      .send({ status: false, message: "Cart not found for this user" });

  res.status(200).send({ status: true, cart: cart });
};

exports.decreaseQuantity = async (req, res) => {
  // use add product endpoint for increase quantity
  let userId = req.params.userId;
  let user = await User.exists({ _id: userId });
  let productId = req.body.productId;

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let cart = await Cart.findOne({ userId: userId });
  if (!cart)
    return res
      .status(404)
      .send({ status: false, message: "item not found in cart please add to cart first" });

  let itemIndex = cart.products.findIndex((p) => p.productId == productId);
  console.log(itemIndex);

  if (itemIndex > -1 && cart.products[itemIndex].quantity > 0) {
    let productItem = cart;
    productItem.products[itemIndex].quantity -= 1;
    productItem.products[itemIndex].total = Number(productItem.products[itemIndex].total) - Number(cart.products[itemIndex].productprice) ;
    productItem.subtotal =Number( productItem.subtotal) - Number(cart.products[itemIndex].productprice);
    cart = productItem;
    
    cart = await cart.save();
    return res.status(200).send({ status: true, updatedCart: cart });
  }
  else {

  }
  res
    .status(400)
    .send({ status: false, message: "item not found in cart please add to cart first" });
};

exports.increaseQuantity = async (req, res) => {
  // use add product endpoint for increase quantity
  let userId = req.params.userId;
  let user = await User.exists({ _id: userId });
  let productId = req.body.productId;

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let cart = await Cart.findOne({ userId: userId });
  if (!cart)
    return res
      .status(404)
      .send({ status: false, message: "Cart not found for this user" });

  let itemIndex = cart.products.findIndex((p) => p.productId == productId);
  console.log(cart.products);

  if (itemIndex > -1) {
    let productItem = cart;
    productItem.products[itemIndex].quantity += 1;
    productItem.products[itemIndex].total = Number(productItem.products[itemIndex].total) + Number(cart.products[itemIndex].productprice) ;
    productItem.subtotal =Number( productItem.subtotal) + Number(cart.products[itemIndex].productprice);
    cart = productItem;
    cart = await cart.save();
    return res.status(200).send({ status: true, updatedCart: cart });
  }
  else {

  }
  res
    .status(400)
    .send({ status: false, message: "Item does not exist in cart" });
};
exports.removeItem = async (req, res) => {
  let userId = req.params.userId;
  let user = await User.exists({ _id: userId });
  let productId = req.body.productId;
  console.log("product id is",req.body.productId);

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let cart = await Cart.findOne({ userId: userId });
  if (!cart)
    return res
      .status(404)
      .send({ status: false, message: "Cart not found for this user" });

  let itemIndex = cart.products.findIndex((p) => p.productId == productId);
  if (itemIndex > -1) {
    cart.products.splice(itemIndex, 1);
    cart = await cart.save();
    return res.status(200).send({ status: true, updatedCart: cart });
  }
  res
    .status(400)
    .send({ status: false, message: "Item does not exist in cart" });
};