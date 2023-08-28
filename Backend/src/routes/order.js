const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/order");

orderRouter.post("/order/:userId", orderController.placeOrder);

module.exports = orderRouter;