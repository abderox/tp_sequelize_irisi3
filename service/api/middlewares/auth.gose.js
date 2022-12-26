const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require('../models/User.gose')

const verifyToken = (req, res, next) => {
    console.log("req.session.token", req.session.token);
    console.log("req.session.token", req.headers);
    let token = req.session.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        console.log("decoded", decoded);
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) => {

    User.findById(req.userId).populate("roles", "-__v").then(
        user => {
            console.log("user", user);
            for (let i = 0; i < user.roles.length; i++) {
                if (user.roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({ message: "Require Admin Role!" });
            return;
        }
    )
}

//export all
module.exports = {
    verifyToken,
    isAdmin
}
