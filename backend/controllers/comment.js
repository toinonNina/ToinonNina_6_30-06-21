const conn = require("../connection");
const Comment = require("../models/comment");

// Création d'un commentaire
exports.createComment = (req, res, next) => {
    const comment = new Comment({
        user_id: req.body.user_id,
        post_id: req.params.id,
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
    db.query(`DELETE FROM comment WHERE id = ?`, req.params.id, (error, result) => {
        if (error) return res.status(400).json({ error: "Le commentaire n'a pas pu être supprimé" });
        return res.status(200).json(result);
    });
};