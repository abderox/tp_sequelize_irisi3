const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.seq');
const User = require('../models/user.model');
const Book = require('../models/book.model.seq');

const Order = sequelize.define('Order',

{

    date: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    units: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false,
    },

},

{
    tableName: 'commands',
    timestamps: true,
}


)

User.hasMany(Order, { foreignKey: 'user' })
Order.belongsTo(User, { foreignKey: 'user' })

Book.hasMany(Order, { foreignKey: 'book' })
Order.belongsTo(Book, { foreignKey: 'book' })

module.exports = Order; 