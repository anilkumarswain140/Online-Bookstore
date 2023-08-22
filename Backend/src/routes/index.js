var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.post("/register", async (req, res) => {
    const user = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
    
    return res.status(200).json(user);
  });



router.post("/login", async function(req, res){
    try {
        // check if the user exists
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
          //check if password matches
          const result = req.body.password === user.password;
          if (result) {
            res.status(200).json({ "message": "user found" });
            req.session.userId = user.unique_id;
          } else {
            res.status(400).json({ error: "password doesn't match" });
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      } catch (error) {
        res.status(400).json({ error });
      }
});

router.get('/profile', function (req, res, next) {
    console.log("profile");
    User.findOne({ unique_id: req.session.userId }, function (err, data) {
        console.log("data");
        console.log(data);
        if (!data) {
            res.redirect('/');
        } else {
            //console.log("found");
        }
    });
});

router.get('/logout', function (req, res, next) {
    console.log("logout")
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});



module.exports = router;