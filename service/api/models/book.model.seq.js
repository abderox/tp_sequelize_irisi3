const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.seq');


const Book = sequelize.define('Book',
{

    titre : { 
        type: DataTypes.STRING, 
        allowNull: true,
        unique: false,
    },
    description  :{
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: false,
        
    },
    price : {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
    },
    couverture : {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    }

},{
    tableName: 'Books',
    timestamps: true,
    underscored: true,
}
)

module.exports = Book;