const express = require('express');

const app = express();
// demande POST gestion avec body-parser, afin d'extraire objet JSON 
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const conn = require("./connection");
//import de dotenv pour gérer des variables cachées  pour sécuriser les infos admin
require('dotenv').config();




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use('/api/auth', userRoutes);
module.exports = app;