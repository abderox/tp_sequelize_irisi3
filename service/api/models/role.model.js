const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.seq');

const User = require('./user.model');

const Role = sequelize.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'roles',
    timestamps: false,
});

User.belongsToMany(Role, { through: "user_roles" });
Role.belongsToMany(User, { through: "user_roles" });


module.exports = Role;