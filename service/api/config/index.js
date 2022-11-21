const {Client} = require('pg');
// const dbConfig = require('./db.config.js');



module.exports.getClient = async () => {
    const sql = new Client({
        user: "postgres",
        host: "localhost",
        database: "book-abdelhadi",
        password: "root",
        port: 5432,
    });
    await sql.connect();
    return sql;
  };

