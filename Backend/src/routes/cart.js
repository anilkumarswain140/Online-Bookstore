const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controllers/cart");

cartRouter.post("/cart/:userId", cartController.addItemToCart);
cartRouter.get("/cart/:userId", cartController.getCart);
cartRouter.patch("/cart/deceasequantity/:userId", cartController.decreaseQuantity);
cartRouter.patch("/cart/inceasequantity/:userId", cartController.increaseQuantity);
cartRouter.delete("/cart/:userId", cartController.removeItem);

module.exports = cartRouter;