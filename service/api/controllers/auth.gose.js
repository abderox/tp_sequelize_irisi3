const User = require('../models/User.gose');
const Role = require('../models/Role.gose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//signup user
const signup =(req, res) => {
    const user = new User({
        username: req.body.username,
        nom: req.body.nom,
        prenom: req.body.prenom,
        address: req.body.address,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    user.save((err, user) => {
        if (err) {
        res.status(500).send({ message: err });
        return;
        }
        if (req.body.roles) {
        Role.find(
            {
            name: { $in: req.body.roles },
            },
            (err, roles) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            user.roles = roles.map((role) => role._id);
            user.save((err) => {
                if (err) {
                res.status(500).send({ message: err });
                return;
                }
                res.send({ message: 'User was registered successfully!' });
            });
            }
        );
        } else {
        Role.findOne({ name: 'user' }, (err, role) => {
            if (err) {
            res.status(500).send({ message: err });
            return;
            }
            user.roles = [role._id];
            user.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: 'User was registered successfully!' });
            });
        });
        }
    });
}


//signin user

const signin = (req, res) => {

    console.log(req.body);
  
    if (req.body.username.includes("@")) {
  
      User.findOne({
        email: req.body.username,
      })
        .populate("roles", "-__v")
        .exec((err, user) => {
          checkAuth(req, res, err, user);
        });
    }
  
    else {
      User.findOne({
        username: req.body.username,
      })
        .populate("roles", "-__v")
        .exec((err, user) => {
          checkAuth(req, res, err, user);
        });
    }
  };
  

  const checkAuth = (req, res, err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
  
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    console.log(passwordIsValid);
  
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }
    
    var authorities = [];
 
    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
    
    var token = jwt.sign({ id: user.id, roles: authorities }, "secret", {
      expiresIn: 86400, // 24 hours
    }); 

    console.log(token);
    req.session.token = token;

    res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
    });

}

module.exports = {
    signup,
    signin
}