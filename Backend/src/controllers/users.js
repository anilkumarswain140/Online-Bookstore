const auth = require('../auth/auth');
var User = require('../models/user');
const register = async (req, res, next) => {
    const user = await User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });
    if(!user){return res.status(500).json({error:"unable to create a user"});}
    return res.status(200).json(user);
};

const login = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
        //check if password matches
        const result = req.body.password === user.password;
        if (result) {
            var token = auth.createToken(user);
            req.session.userId = user.unique_id;
            res.status(200).json({ "token": token , user : user});


        } else {
            res.status(400).json({ error: "password doesn't match" });
        }
    } else {
        res.status(400).json({ error: "User doesn't exist" });
    }
}

const getProfile = async (req, res, next) => {
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
            res.status(200).json({ "id": user._id, "username": user.username, "email": user.email, "role" : user.role })
        }

    }
}

const logout = (req, res, next) => {
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
}

module.exports = {
    register,
    login,
    getProfile,
    logout
};