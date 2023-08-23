var express = require('express');
var router = express.Router();
var User = require('../models/user');
const auth = require('../auth/auth');


router.post("/register", async (req, res) => {
  const user = await User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  return res.status(200).json(user);
});



router.post("/login", async function (req, res) {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      //check if password matches
      const result = req.body.password === user.password;
      if (result) {
        var token = auth.createToken(user);
        req.session.userId = user.unique_id;
        res.status(200).json({ "token": token });


      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
});

router.get('/profile', async function (req, res, next) {
  console.log("profile");
  const verifyed = auth.verifyToken(req.headers.authorization);
  if (verifyed == undefined || verifyed == null || verifyed == "") {
    return res.status(401).json({ error: "unatherized" })
  }
  else {
    const user = await User.findOne({ unique_id: req.session.userId });

    console.log(user);
    if (!user) {
      res.redirect('/');
    } else {
      console.log("found", user);
      res.status(200).json({ "id": user._id, "username": user.username, "email": user.email })
    }

  }
});

router.get('/logout', function (req, res, next) {
  console.log("logout")
  if (req.session) {
    // delete session object
    auth
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