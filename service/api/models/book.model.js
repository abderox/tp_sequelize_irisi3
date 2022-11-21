const { getClient } = require("../config");
var sql = null;

(async () => {
    sql = await getClient();
})();

    class Book {


        constructor(book) {
            this.id = book.id;
            this.titre = book.titre;
            this.description = book.description;
            this.price = book.price;
            this.couverture = book.couverture;
            this.genre = book.genre;
        }

    static async create(newbook, result) {
        await sql.query("INSERT INTO books(titre, description, price, couverture,genre ) VALUES($1,$2,$3,$4,$5)",
            [
                newbook.titre,
                newbook.description,
                newbook.price,
                newbook.couverture,
                newbook.genre
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("created book: ", { id: res.insertId, ...newbook });
                result(null, { id: res.insertId, ...newbook });
            });
    }


    static async updateById(book, id, result) {
        await sql.query(
            
            "UPDATE books SET titre = $1, description = $2, price = $3, couverture = $4, genre = $5 WHERE id = $6",
            [
                book.titre,
                book.description,
                book.price,
                book.couverture,
                book.genre,
                id
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
                if (res.affectedRows == 0) {

                    result({ kind: "not_found" }, null);
                    return;
                }
                console.log("updated book: ", { id: id, ...book });

                result(null, { id: id, ...book });
            }
        );
    }
    static async findById(bookId, result) {
        await sql.query("SELECT * FROM books WHERE id = $1", [bookId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
                console.log("found book: ", res);
                result(null, res.rows[0]);
            
        });
    }

   
    static async getAll(result) {
        await sql.query("SELECT * FROM books", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("books: ", res);
            result(null, res.rows);
        });
    }
    
    static async remove(id, result) {
        await sql.query("DELETE FROM books WHERE id = $1", [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("deleted book with id: ", id);
            result(null, res);
        });
    }
    static async removeAll(result) {
        await sql.query("DELETE FROM books", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log(`deleted ${res.affectedRows} books`);
            result(null, res);
        });
    }
}


module.exports = Book;






