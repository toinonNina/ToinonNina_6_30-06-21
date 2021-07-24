const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'L\'identifiant est invalide';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('La requète n\'est pas valide')
        });
    }
};