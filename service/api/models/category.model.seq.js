const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.seq');
const Book = require('./book.model.seq')



const Genre = sequelize.define('Genre', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },

})

Genre.hasMany(Book, { foreignKey: 'genre' })
Book.belongsTo(Genre, { foreignKey: 'genre' })



module.exports = Genre;