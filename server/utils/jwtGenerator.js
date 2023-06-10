const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(userid){
    const payload = {
        user: userid

    }
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"});
}

module.exports = jwtGenerator;