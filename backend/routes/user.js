const express = require('express');
const router = express.Router();


// Controle si l'email de l'utilisateur est déja enregistrer
const userCtrl = require('../controllers/users');
// Controle la forme du mot de pass pour forcé l'utilisateur a le complexifier pour la sécurité
const passwordValidation = require('../middleware/password-validation');
const auth = require('../middleware/auth');


router.post('/signup', passwordValidation, userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete/:id', auth, userCtrl.delete);

module.exports = router;