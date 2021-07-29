const jwt = require('jsonwebtoken');
const conn = require("../connection");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    conn.query('SELECT comment.id, user_id FROM comment INNER JOIN user ON user.id = comment.user_id WHERE comment.id=? ', req.params.id, (error, result) => {
        if ((result[0].user_id === userId) || isAdmin === 1) {
            console.log("action autorisé");
            next();
        } else {
            res.status(403).json({ message: "Action non autorisé" });
        }
    });

};