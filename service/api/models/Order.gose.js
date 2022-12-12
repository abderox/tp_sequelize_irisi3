const mongoose = require("mongoose");

const Order = mongoose.model(
    "Order",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        book:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        },
        date: {
            type: String,
            required: true,
            unique: false,
        },
        status: {
            type: String,
            required: false,
            unique: false,
        },
        units: {
            type: Number,
            required: true,
            unique: false,
        }
    }, { timestamps: true })

);

module.exports = Order;
