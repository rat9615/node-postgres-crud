const { DataTypes } = require('sequelize');
const database = require('../config/database');

module.exports = database.define(
    'user',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {},
);
