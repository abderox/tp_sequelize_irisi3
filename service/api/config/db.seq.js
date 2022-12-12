const Sequelize = require("sequelize");
const pg = require('pg');

// const sequelize = new Sequelize(
//     "bookery",
//     "postgres",
//     "root",
//     {
//         host: "localhost",
//         dialectModule:  pg,
//         logging: false,
//     },
// );

const sequelize = new Sequelize({
  database: "bookery",
  username: "postgres",
  password: "root",
  host: "postgree",
  port: 5432,
  dialect: "postgres"
});


// const sequelize = new Sequelize('postgres://postgres:root@postgre:5432/bookery', {
//   dialectModule: pg
// });

module.exports = sequelize;