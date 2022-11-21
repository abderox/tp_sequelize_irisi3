const sequelize = require("../config/db.seq");

const initial=async ()=> {

  return await sequelize.authenticate()

  }

  module.exports = initial;