const path = require('path');
const fs = require('fs-extra')
const Book = require("../models/book.model");


const getAll = (req, res) => {
    Book.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "error"
            });
        } else {
            res.send(data);
        }
    });
}

const create = (req, res) => {

    if (Object.keys(req.body).length < 1) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const book = new Book({
        titre: req.body.titre,
        description: req.body.description,
        price: req.body.price,
        couverture: req.body.couverture,
        genre: req.body.genre
    });

    Book.create(book, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Book."
            });
        } else {
            res.send(data);
        }
    });
}


const remove = (req, res) => {
    Book.remove(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "error"
            });
        } else {
            res.send(data);
        }
    });
}

const removeAll = (req, res) => {
    Book.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "error"
            });
        } else {
            res.send(data);
        }
    });
}


const updateById = (req, res) => {
    Book.updateById(req.body, req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "error"
            });
        } else {
            res.send(data);
        }
    });
}

const findById = (req, res) => {
    Book.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "error"
            });
        } else {
            res.send(data);
        }
    });
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
    const filename = path.join(process.cwd(), 'covers', cover);
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




module.exports = {
    getAll,
    create,
    updateById,
    findById,
    remove,
    removeAll,
    uploadProfileImage,
    downloadCover
}