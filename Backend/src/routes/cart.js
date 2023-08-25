const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controllers/cart");

cartRouter.post("/:userId", cartController.addItemToCart);
cartRouter.get("/:userId", cartController.getCart);
cartRouter.patch("/:userId", cartController.decreaseQuantity);
cartRouter.delete("/:userId", cartController.removeItem);

module.exports = cartRouter;