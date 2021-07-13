const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
// Controle si l'email de l'utilisateur est déja enregistrer

const userCtrl = require('../controllers/comment');



router.post('/create', auth, userCtrl.createComment);
router.delete('/delete/:id', auth, userCtrl.deleteComment);


module.exports = router;