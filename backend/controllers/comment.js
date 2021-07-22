const conn = require("../connection");
const Comment = require("../models/comment");

// Création d'un commentaire
exports.createComment = (req, res, next) => {
    const comment = new Comment({
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        content: req.body.content,
    });

    conn.query(`INSERT INTO comment SET ?`, comment, (error, result) => {
        if (error) {
            res.status(400).json({ error: error });
        } else {
            res.status(200).json({ result });
        }
    });
};

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    let comment_id = req.params.id;
    conn.query(`DELETE FROM comment WHERE id = ?`, comment_id, (error, result) => {
        if (error) return res.status(400).json({ error: "Le commentaire n'a pas pu être supprimé" });
        return res.status(200).json(result);
    });
};

exports.getAllComm = (req, res, next) => {
    conn.query(`SELECT comment.id, comment.content, comment.dateCreate, comment.user_id, comment.post_id, user.username FROM comment INNER JOIN post ON post.id = comment.post_id left join user on user.id = comment.user_id WHERE post.id= ? ORDER BY dateCreate DESC`, req.params.id, (error, result) => {
        if (error) return res.status(400).json({ error: "Les commentaires n'ont pas pu être affiché" });
        return res.status(200).json(result);
    });
};