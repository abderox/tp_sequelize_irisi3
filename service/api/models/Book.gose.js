const mongoose = require("mongoose");

const Book = mongoose.model(
    "Book",
    new mongoose.Schema({
        titre: {
            type: String,
            required: true,
            unique: true,
        },
        price : {
            type: Number,
            required: true,
            unique: false,
        },
        description: {
            type: String,
            required: true,
            unique: false,
        },
        couverture: {
            type: String,
            required: true,
            unique: false,
        },
        storage: {
            type: Number,
            required: true,
            unique: false,
        },
        genre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Genre",
        },
        editions:[]
    }, { timestamps: true })
);

module.exports = Book;
