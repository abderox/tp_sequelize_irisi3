const Role = require("../models/role.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();



const signin = (req, res) => {
    if (req.body.username.includes("@")) {
        User.findOne({
            where: {
                email: req.body.username
            }
        }).then(async (user) => {
            await checkAuth(req, res, user);
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    }
    else {
        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(async (user) => {
            await checkAuth(req, res, user);
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    }
}


const checkAuth = async (req, res, user) => {

    if (!user) {
        res.status(404).send({ message: "User Not found." });
        return;
    }

    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({
            message: "Invalid Password!"
        });
    }

    var authorities = [];
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].dataValues.name.toUpperCase());
    }

    console.log("authorities", authorities);


    var token = jwt.sign({ id: user.id, roles: authorities }, process.env.JWT_KEY, {
        expiresIn: 86400 
    });

    console.log("token", token);
    req.session.token = token;
    res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        authorities ,
        message: "Login Successful",
    });

}

const signup = (req, res) => {


    User.findOne({
        where: {
            [Sequelize.Op.or]: [
                { username: req.body.username },
            ]}
    }).then(async (user) => {
        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }
        else {

            User.create({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8)
            })
                .then(user => {
                    if (req.body.roles) {
                        Role.findAll({
                            where: {
                                name: {
                                    [Sequelize.Op.or]: req.body.roles
                                }
                            }
                        }).then(roles => {
                            user.setRoles(roles).then(() => {
                                res.send({ message: "User was registered successfully!" });
                            });
                        });
                    } 
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        }})

   
}


// const authJwt = {
//     verifyToken: (req, res, next) => {
//         let token = req.headers["x-access-token"];

//         if (!token) {
//             return res.status(403).send({ message: "No token provided!" });
//         }

//         jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
//             if (err) {
//                 return res.status(401).send({ message: "Unauthorized!" });
//             }
//             req.userId = decoded.id;
//             next();
//         });
//     }
// };

module.exports = {
    signin,
    signup
}