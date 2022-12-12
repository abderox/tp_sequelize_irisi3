const mongoose = require("mongoose");

const Genre = mongoose.model(
    "Genre",
    new mongoose.Schema({
        name: {
            type: String,
            allowNull: true,
            unique: false,
        },
    }, { timestamps: true })
);

module.exports = Genre;

