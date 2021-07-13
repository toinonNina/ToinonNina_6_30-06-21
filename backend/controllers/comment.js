const conn = require("../connection");
const Comment = require("../models/comment");

// Création d'un commentaire
exports.createComment = (req, res, next) => {

    date = new Date();
    month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    const comment = new Comment({
        user_id: req.user_id,
        id_post: req.params.id,
        content: req.body.content,
        date_creation: date.getFullYear() + "-" + month + "-" + day + " " + date.getHours() + ":" + date.getMinutes(),
        status: 1
    });

    conn.query(`INSERT INTO comment SET ?`, comment, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Commentaire non crée' });
        } else {
            res.status(200).json({ result });
        }
    });
};

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {

    let comment;

    conn.query(`SELECT * FROM comment WHERE id = ?`, req.params.id, (error, result) => {
        comment = result[0];

        if (comment.user_id === req.user_id || req.admin === 1) {
            db.query(`DELETE FROM comment WHERE id = ?`, req.params.id, (error, result) => {
                if (error) return res.status(400).json({ error: "Le commentaire n'a pas pu être supprimé" });
                return res.status(200).json(result);
            });

        } else {
            return res.status(403).json({ error: "Vous ne pouvez pas supprimer le commentaire !" });
        }
    });
};