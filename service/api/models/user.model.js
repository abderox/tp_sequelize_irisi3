const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.seq');


const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    nom :{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    prenom :{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    phone :{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    address :{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    }
    
}, {
    tableName: 'users',
    timestamps: true,
});



module.exports = User;