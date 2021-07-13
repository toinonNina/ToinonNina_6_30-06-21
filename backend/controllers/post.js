const Post = require("../models/post");
const fs = require("fs");
const conn = require("../connection");
require('dotenv').config();
exports.createPost = (req, res, next) => {
    date = new Date();
    month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let image = "";

    if (req.file) {
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }

    const post = new Post({
        user_id: req.id_user,
        content: req.body.content,
        image: image,
        date: date.getFullYear() + "-" + month + "-" + day + " " + date.getHours() + ":" + date.getMinutes(),
        status: 1
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
    conn.query(`UPDATE post SET content = ? WHERE id = ?`, [req.body.content, req.params.id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Le post n'a pas pu être modifié" });
        }
        return res.status(200).json(result);
    });
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
    let post;

    conn.query(`SELECT * FROM post WHERE id = ?`, req.params.id, (error, result) => {
        post = result[0];

        if (post.id === req.user_id || req.admin === 1) {
            conn.query(`DELETE FROM post WHERE id = ?`, req.params.id, (error, result) => {
                if (error) {
                    return res.status(400).json({ error: "Le post n'a pas pu être supprimé" });
                }
                return res.status(200).json(result);
            });
        } else {
            return res.status(403).json({ error: "Vous ne pouvez pas supprimer le post !" });
        }
    });
};

// Accès à un post 
exports.getOnePost = (req, res, next) => {

    const Data = {};
    conn.query(`SELECT comment.*, user.name FROM comment INNER JOIN user ON user.user_id = comment.user_id WHERE post_id = ?`, req.params.id, (error, result) => {
        Data.comment = result;
    });
    conn.query(`SELECT post.*, user.name FROM post INNER JOIN user ON user.user_id = post.user_id WHERE id = ?`, req.params.id, (error, result) => {
        Data.post = result[0];
        return res.status(200).json(Data);
    });
};


// Accès à tous les posts
exports.getAllPost = (req, res, next) => {
    let allComments = [];
    let allPosts = [];

    conn.query(`SELECT comment.*, user.name FROM comment INNER JOIN user ON user.id_user = comment.id_user`, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Vous ne pouvez pas accéder à tous les commentaires" });
        }
        result.forEach(element => {
            if (allComments[element.post_id] == undefined) {
                allComments[element.post_id] = [];
            }
            allComments[element.post_id].push(element);
        });
    });

    conn.query(`SELECT id, post.id_user, content, image, date, status, name FROM post INNER JOIN user ON user.id_user = post.id_user ORDER BY date DESC`, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Vous ne pouvez pas accéder à tous les posts" });
        }
        result.forEach(element => {
            element.comment = allComments[element.id];
            allPosts.push(element);
        });
        return res.status(200).json(allPosts);
    });
};
