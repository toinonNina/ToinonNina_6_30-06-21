const mysql = require("mysql2");
const User = require("../models/User");
const fs = require("fs");
const conn = require("../connection");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                isAdmin: 0,
            });
            const querysql = "INSERT INTO user SET ?";
            conn.query(querysql, user, (err, result, field) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json("erreur");
                }
                return res.status(201).json({ message: 'Votre compte a bien été crée !' }, );
            });
        });
};