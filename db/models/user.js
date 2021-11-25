const { DataTypes } = require('sequelize');

const { createTable } = require('../');

const User = createTable('user', {
    firstName: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(64),
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(64),
        allowNull: false,
        default: 'active',
    },
}, {});

console.log(User.name);
exports.User = User;
