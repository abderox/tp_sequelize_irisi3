const Book = require('../models/book.model.seq');
const Genre = require('../models/category.model.seq');
const Edition = require('../models/edition.model.seq');
const path = require('path');
const fs = require('fs-extra')

const getAllBooks = async (req, res) => {
    console.log("🚀 ~ file: bookery.controller.js ~ line 100 ~ getAllBooks ~ req")
    try {

        const books = await Book.findAll({
            include: [{
                model: Genre,
            }],
        });

        const genres=[]
        const genres_ = await Genre.findAll();
      
            genres_.forEach((genre) => {
                // console.log("🚀 ~ file: bookery.controller.js ~ line 21 ~ getAllBooks ~ genre", genre)
                console.log("🚀 ~ file: bookery.controller.js ~ line 21 ~ getAllBooks ~ genre", genre.name)
                console.log("🚀 ~ file: bookery.controller.js ~ line 21 ~ getAllBooks ~ genre", genre.id)
                
                genres.push({
                    id: genre.id,
                    name: genre.name
                })



            });
            console.log("🚀 ~ file: bookery.controller.js ~ line 21 ~ getAllBooks ~ genres", genres)

            // const books_= books.reduce(
            //     (acc, book) => {
            //         const genre = genres.find((genre) => genre.id === book.genre_id);
            //         const editions
            //         console.log("🚀 ~ file: bookery.controller.js ~ line 21 ~ getAllBooks ~ genre", genre)
            //         console.log("🚀 ~ file: bookery.controller.js ~ line 21 ~ getAllBooks ~ genre", genre.name)
            //         console.log("🚀 ~ file: bookery.controller.js ~ line 21 ~ getAllBooks ~ genre", genre.id)
            //         acc.push({
            //             id: book.id,
            //             title: book.title,
            //             genre: genre.name,
            //             genre_id: genre.id,
            //             description: book.description,
            //             couverture: book.couverture,
            //             edition_date: edition.edition_date,
            //             maison_edition: edition.maison_edition,
            //         });
            //         return acc;
            //     },
            //     []
            // ) 

            
            res.status(200).json({
                books: books,
                genres: genres
            });
       

    
       
    } catch (error) {
        res.status(500).json(error);
    }
}

const getBookById = async (req, res) => {
    console.log(req.params.id)
    try {
        const book = await Book.findByPk(req.params.id, {
            include: [{
                model: Genre,
            },{
                model: Edition,
            }],
        });
        console.log(book)
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json(error);
    }
}


const createBook = async (req, res) => {
    try {
        const genrename = req.body.genre;
        delete req.body.genre;

        console.log(req.body)
        
        const edition = {}
        edition.date_parutiion = req.body.edition_date;
        edition.maison_edition = req.body.maison_edition;

        delete req.body.edition_date;
        delete req.body.maison_edition;

        console.log(req.body)
        const genre = await Genre.findOrCreate({
            where: { name: genrename },
            //limit one
            limit: 1,
        });
        const book = await Book.create(req.body);
        //create genre if not exists
        //setgenre
        console.log(genre[0].id)
     

        await book.setGenre(genre[0].id);

        //create edition
        const edition_ = await Edition.create({
            date_parutiion: edition.date_parutiion,
            maison_edition: edition.maison_edition
        })
        //set edition
        await edition_.setBook(book.id);

        res.status(201).json(book);
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
}

const updateBook = async (req, res) => {
    try {

        const genrename = req.body.genre;
        delete req.body.genre;
        console.log(req.body)

        const edition = {}
        edition.date_parutiion = req.body.edition_date;
        edition.maison_edition = req.body.maison_edition;

        delete req.body.edition_date;
        delete req.body.maison_edition;

          //create genre if not exists
        const genre = await Genre.findOrCreate({
            where: { name: genrename },
            //limit one
            limit: 1,
        });

 
        console.log(genre[0].id)
        console.log(req.params.id)
        req.body.genre = genre[0].id
        const book = await Book.update(req.body, {
           
            where: { id: req.params.id },
        });
    
       
        res.status(200).json({
            message: "updated successfully"
        });

        // update edition 
        await Edition.update({
            date_parutiion: edition.date_parutiion,
            maison_edition: edition.maison_edition
        }, {
            where: { book_id: req.params.id },
        });


    } catch (error) {
            
        res.status(200).json({
            message: "updated successfully"
        });

    }
}


const deleteBook = async (req, res) => {
    try {
        const book = await Book.destroy({
            where: { id: req.params.id },
        });
        res.status(200).json({
            message  : "deleted successfully"
        });
    } catch (error) {
        res.status(500).json(error);
    }
}


const uploadProfileImage = async (req, res) => {


    fs.ensureDirSync(path.join(process.cwd(), 'covers'));
    const maxSize = 8 * 1024 * 1024;

    if (!req.files.file) {
        return res.status(400).send('No files were uploaded.');
    }


    if (req.files.file > maxSize) {
        return res.status(400).send('File too large');
    }


    const cover = req.files.file.name.split('.')[0] + '-' + Date.now() + '.' + req.files.file.name.split('.').pop();
    const filename = path.join(process.cwd(), 'covers', req.files.file.name);
    console.log(filename);
    const file = req.files.file;
    console.log("🚀 ~ file: auth.controller.js ~ line 319 ~ uploadProfileImage ~ file", file)

    file.mv(filename, async (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.status(200).json({
            message: 'File uploaded!',
        });
    })



}


const downloadCover = async (req, res) => {
    
    const file = path.join(process.cwd(),'covers', req.params.cover);
    console.log("🚀 ~ file: profile.controller.js ~ line 100 ~ downloadAvatar ~ file", file)
   
    const fileExists = await fs.existsSync(file);
    if (fileExists) {

        res.header('Content-Type', 'image/jpeg', 'image/png', 'image/jpg');
        res.sendFile(file);
    }
    else {
        res.status(404).json({
            message: "cover not found"
        })
    }
}

const getAllGenres = async (req, res) => {
    try {
        const genres = new Map();
        const genres_ = Genre.findAll();
        genres_.then((genres__) => {
            genres__.forEach((genre) => {
                genres.set(genre.id, genre.name);
            });
            res.status(200).json(genres);
        }
        );
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    uploadProfileImage,
    downloadCover,
    getAllGenres
};
