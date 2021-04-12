require('dotenv').config();
const { Sequelize } = require('sequelize');

module.exports = {
    sequelize: new Sequelize(
        process.env.PGDATABASE,
        process.env.PGUSER,
        process.env.PGPASSWORD,
        {
            host: process.env.PGHOST,
            dialect: 'postgres'
        }
    ),
    Sequelize
};
