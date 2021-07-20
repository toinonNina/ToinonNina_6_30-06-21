const Post = require("../models/post");
const fs = require("fs");
const conn = require("../connection");
const { post } = require("../routes/post");
require('dotenv').config();

exports.createPost = (req, res, next) => {
    console.log(req.body);
    let image = "";

    if (req.file) {
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }

    const post = new Post({
        user_id: req.body.user_id,
        title: req.body.title,
        content: req.body.content,
        image: image
    });


    conn.query(`INSERT INTO post SET ?`, post, (error, result) => {

        if (error) {
            return res.status(400).json({ error: error });
        }
        return res.status(201).json({ message: "Post crée!" });
    });
};




// Modifier un post
exports.modifyPost = (req, res, next) => {
    let image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    conn.query(`UPDATE post SET content = ?, title = ?, image= ?  WHERE id = ?`, [req.body.content, req.body.title, image, req.params.id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Le post n'a pas pu être modifié" });
        }
        return res.status(200).json(result);
    });
};

//delete un post
exports.deletePost = (req, res, next) => {
    conn.query(`DELETE FROM post WHERE id =?`, req.params.id, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Le post n'a pas pu être supprimé" });
        }
        return res.status(200).json({ message: "Post supprimé!" });
    });
};

//tout les posts
exports.getAllPost = (req, res, next) => {

    conn.query('SELECT post.id, content, image, title, user_id, dateCreate, isAdmin, username  FROM post INNER JOIN user ON user.id = post.user_id ORDER BY dateCreate DESC', (error, result) => {
        if (error) {
            return res.status(400).json({ error: "impossible d'afficher tous les post" });
        }
        return res.status(200).json(result);
    });
};
// un post
exports.getOnePost = (req, res, next) => {


    conn.query('SELECT * FROM post WHERE post.id=? ', req.params.id, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "impossible d'afficher un  post" });
        }
        return res.status(200).json(result);
    });
};