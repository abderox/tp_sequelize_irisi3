const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.seq');
const Book = require('./book.model.seq')

const Edition = sequelize.define('Edition',
{ 
    date_parutiion : {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    maison_edition : {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    }

},
{
    timestamps: false,
}
)

Book.hasMany(Edition, { foreignKey: 'book' })
Edition.belongsTo(Book, { foreignKey: 'book' })

module.exports = Edition;

