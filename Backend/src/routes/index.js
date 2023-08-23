var express = require('express');
var router = express.Router();
var User = require('../models/user');
const auth = require('../auth/auth');
const userController = require('../controllers/users')


router.post("/register", userController.register);
router.post("/login",userController.login);
router.get('/profile', userController.getProfile);
router.get('/logout', userController.logout);



module.exports = router;