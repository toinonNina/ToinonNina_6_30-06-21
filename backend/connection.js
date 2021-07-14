const mysql = require('mysql2');
require('dotenv').config();

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('groupomania', 'root', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});



// Test de la connection
sequelize.authenticate()
    .then(() => console.log('Connection to the database has been established succesfully.'))
    .catch(error => console.error('Unable to connect do the database', error));


module.exports = sequelize;