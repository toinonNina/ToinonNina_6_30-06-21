const mysql = require("mysql2");
const User = require("../models/User");
const fs = require("fs");
const conn = require("../connection");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();




//fonction qui va crypté le mot de passe qui va le prendre et creer un nouveau user 
//avec ce mot de passe et l'email et va l'enregistrer dans la base de donnée
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                isAdmin: 0,
            });
            conn.query('INSERT INTO user SET ?', user, (err, result, field) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json("erreur");
                }
                return res.status(201).json({ message: 'Votre compte a bien été crée !' }, );
            });
        })
        .catch(error => res.status(500).json({ error }));
};


//fonction qui permet au utilisateur existant de se connecter
exports.login = async(req, res, next) => {
    //let status = '';
    //console.table([req.body.email, req.body.password]);
    if (req.body.email && req.body.password) {
        conn.query('SELECT * FROM user WHERE email= ?', req.body.email, (error, results, fields) => {
            if (results.length > 0) {
                //bcrypt va comparé le mot de passe que l'utilisateur va entrer avec ce qui est déja enregistrer avec compare
                bcrypt.compare(req.body.password, results[0].password)
                    .then((valid) => { //valid est un boolean qui est d'abord sur true 
                        //si c'est false il y a error
                        if (!valid) {
                            res.status(401).json({ message: 'Mot de passe incorrect' });
                        } else {
                            //confirmation User connecté
                            console.log(req.body.email, "s'est connecté");
                            //on décris le niveau d'acces du membre
                            if (results[0].isAdmin === 1) {
                                status = 'administrateur';
                            } else {
                                status = 'membre';
                            }
                            res.status(200).json({
                                userId: results[0].id,
                                email: results[0].email,
                                status: status,
                                token: jwt.sign({ userId: results[0].id, status: status }, process.env.DB_TOKEN, { expiresIn: '24h' })
                            });

                        }
                    });
            } else {
                res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' });
            }
        });
    } else {
        res.status(500).json({ message: "Entrez votre email et votre mot de passe" });
    }
};

//fonction qui permettra a l'utilisateur de supprimer son compte
exports.delete = (req, res, next) => {

    conn.query(`DELETE FROM user WHERE id = ?`, req.params.id, (error, result) => {
        if (error) {
            return res
                .status(400)
                .json({ error: "L'utilisateur n'a pas pu être supprimé" });
        }
        return res.status(200).json(result);
    });

};