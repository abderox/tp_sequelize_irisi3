// const sequelize = require("../config/db.seq");

const Role = require("../models/role.model");

const initial=async ()=> {

    
      const countRoles = await Role.count();

      if (countRoles === 0) {
      
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'etudiant' to roles collection");
        });
  
        new Role({
          name: "client"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'super_admin' to roles collection");
        });
  
      }
      else{
        console.log("roles already exist");
      }
 
  
  }

  module.exports = initial;

