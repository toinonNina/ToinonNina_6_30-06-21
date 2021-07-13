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
        id_user: req.id_user,
        content: req.body.content,
        image: image,
        date: date.getFullYear() + "-" + month + "-" + day + " " + date.getHours() + ":" + date.getMinutes(),
        status: 1
    });

    db.query(`INSERT INTO post SET ?`, post, (error, result) => {
        if (error) {
            return res.status(400).json({ error: error });
        }
        return res.status(201).json({ message: "Post crée!" });
    });
};