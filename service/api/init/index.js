const { getClient } = require("../config");

const createBookTable = async (sql) => {
   
    await sql.query(`CREATE TABLE IF NOT EXISTS Books (
        id BIGSERIAL PRIMARY KEY,
        titre VARCHAR ,
        description VARCHAR ,
        price DOUBLE PRECISION ,
        couverture VARCHAR ,
        genre VARCHAR 
        
    );`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log("created books table");
    });
}



const init = async () => {
    const sql = await getClient();
    await createBookTable(sql);
}


module.exports = init;
