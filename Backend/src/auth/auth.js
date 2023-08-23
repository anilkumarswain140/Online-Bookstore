const jwt = require('jsonwebtoken');
JWT_SECRET_KEY = "dhdhdhd88wb2338ddhdnd93b3n3id9dndndkdsss9ddnd9ssnsj"
var Accesstoken = "";
function createToken(user) {
    console.log("dhdhdhdhdh");
    let jwtSecretKey = JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: user.unique_id,
    }
    const token = jwt.sign(data, jwtSecretKey);
    console.log("token", token);
    Accesstoken = token;
    return token
}

function verifyToken(header) {
    const token = header;
    if (!token) {
        return null;
    }
    else {
        try {
            const verifed = jwt.verify(token, JWT_SECRET_KEY);
            return verifed;
        }
        catch {
            return console.error("not vierified");
        }
    }
}


function destroyToken() {
    // jwt.
}
module.exports = { createToken, verifyToken, Accesstoken }