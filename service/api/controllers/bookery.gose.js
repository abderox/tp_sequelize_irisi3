const User = require('../models/User.gose');
const Book = require('../models/Book.gose');
const Order = require('../models/Order.gose');
const Genre = require('../models/Category.gose');
const path = require('path');
const fs = require('fs-extra');

const createGenreIfNotExists = async (name_, res) => {
    try {
        const genre = await Genre.findOne({ name: name_ });
        if (!genre) {
            return await Genre.create({
                name: name_
            });
        }
        return genre;

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}


const createBook = async (req, res) => {

    const { titre, price, description, couverture, storage, genre, edition } = req.body;

    try {
        // create genre if not exists
        const genre_ = await createGenreIfNotExists(genre, res);
        // create book 

        const book = await Book.create({
            titre: titre,
            price: price,
            description: description,
            couverture: couverture,
            storage: storage,
            genre: genre_._id
        });
        // push to editions
        book.editions.push(edition);
        // save book
        await book.save();

        res.status(201).json(book);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('genre');
        const genres = await getAllGenres(req,res);
        res.status(200).json({ 
            books: books,
            genres: genres
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book
            = await Book.findById(id).populate('genre');
        if (book) {
            return res.status(200).json(book);
        }
        res.status(404).json({ message: 'Book not found!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const { titre, price, description, couverture, genre, editions } = req.body;
        // create genre if not exists
        const genre_ = await createGenreIfNotExists(genre, res);
        // find book by objectId
        let book = await Book.findById({ _id: id });
        if (book) {
            console.log(book)
            book.titre = titre;
            book.price = price;
            book.description = description;
            book.couverture = couverture;
            book.genre = genre_._id;
            console.log(genre_._id)
            // concat editions 
            book.editions = book.editions.concat(editions);
            await book.save();
            return res.status(200).json(book);
        }
        res.status(404).json({ message: 'Book not found!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Book.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).send("Book deleted");
        }
        throw new Error("Book not found");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const registerClient = async (req, res) => {
    try {
        const { nom, prenom, phone, address, email } = req.body;
        // register user if not exists
        const
            user = await User.findOne
                ({ email: email });
        if (user) {
            return res.status(400).json({ message: 'User already exists!' });

        }
        const newUser = await User.create({
            nom: nom,
            prenom: prenom,
            phone: phone,
            address: address,
            email: email,
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const createOrder = async (req, res) => {
    try {
        const { books, userId, date } = req.body;


        //get user 
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }
        // create order
        Promise.all(
            books.map(async (book) => {
                //  get book 
                const book_ = await
                    Book.findById(book.id);
                // create order
                if (book_) {
                    await Order.create({
                        book: book_._id,
                        user: user._id,
                        date,
                        units: book.units,
                        status: 'pending'
                    });
                }

            })


        );
        res.status(201).json({ message: 'Order created successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('book');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateOrder = async (req, res) => {
    try {
        console.log(req.params.id);
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        console.log("🚀 ~ file: bookery.gose.js:197 ~ updateOrder ~ order", order)
        
        if (order) {
            if (order.status.toUpperCase() === "PENDING" ) {
                const book = await Book.findById(order.book);
                if (book.storage < order.units) {
                    order.status = "RUNOUT";
                    await order.save();
                    return res.status(400).json({ message: 'Not enough storage!' });
                }
                book.storage = book.storage - order.units;
                await book.save();
                order.status = "PROCESSING";
                await order.save();
                return res.status(200).json(
                    {
                        message: 'Order updated successfully!',
                        order
                    }
                );
            }
            return res.status(400).json({ message: 'Order already done!' });
        }
        res.status(404).json({ message: 'Order not found!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const declineOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (order) {
            order.status = "DECLINED";
            await order.save();
            return res.status(200).json(
                {
                    message: 'Order declined successfully!',
                    order
                }
            );
        }
        res.status(404).json({ message: 'Order not found!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        console.log("Uploaded successfully")
        res.status(200).json({
            message: 'File uploaded!',
        });
    })



}


const downloadCover = async (req, res) => {

    const file = path.join(process.cwd(), 'covers', req.params.cover);
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
        const genres =[];
        const genres_ = await Genre.find({});
        console.log("🚀 ~ file: bookery.gose.js:310 ~ getAllGenres ~ genres_", genres_)
        
  
            genres_.forEach((genre) => {
                genres.push({
                    id: genre.id,
                    name: genre.name
                })
            });

            console.log(genres);
            return genres;
        
    } catch (error) {
       console.log(error)
       return;
    }
}





module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
    registerClient,
    createOrder,
    getOrders,
    updateOrder,
    declineOrder,
    uploadProfileImage,
    downloadCover
}
