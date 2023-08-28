const Order = require('../models/order');
var auth = require('../auth/auth');
const { isValidObjectId } = require("mongoose");

exports.placeOrder = async (req, res) => {
    const verifyed = auth.verifyToken(req.headers.authorization);
    if (verifyed == undefined || verifyed == null || verifyed == "") {
        return res.status(401).json({ error: "unatherized" })
    }
    else {
        let userId = req.params.userId;
        let subtotal = req.body.subtotal;
        console.log(req.params.userId, req.body.productId);
        let user = await User.exists({ _id: userId });
        if (!userId || !isValidObjectId(userId) || !user)
            return res.status(400).send({ status: false, message: "Invalid user ID" });

        let body = req.body;
        if (!body)
            return res.status(400).send({ status: false, message: "Invalid data try again" });
        console.log( typeof(req.body));
        var result = await Order.create({userId,subtotal,products: req.body.products})

        if (result) {
            console.log('updated', result);
            res.status(200).send(result);
        } else {
            console.log('failed', result);
            res.status(400).send({ status: false, message: "request to create order failed" });
        }
    }
};


