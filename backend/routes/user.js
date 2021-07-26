const express = require('express');
const router = express.Router();

// Gestion du nombre de requêtes utilisateurs
const limiter = require('../middleware/Limiter-Request');
const auth = require('../middleware/auth');
// Controle si l'email de l'utilisateur est déja enregistrer
const userCtrl = require('../controllers/users');
// Controle la forme du mot de pass pour forcé l'utilisateur a le complexifier pour la sécurité
const passwordValidation = require('../middleware/password-validation');
// Controle que seul l'utilisateur propriétaire peut effectuer certaine action sur son comptes
const owneruser = require('../middleware/owneruser');


router.post('/signup', passwordValidation, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);
router.delete('/delete/:id', auth, owneruser, userCtrl.deleteUser);
router.get('/users', userCtrl.getAllUser);
router.get('/user/:id', userCtrl.getOneUser);
router.post('/update/:id', auth, owneruser, userCtrl.modifyUser);


module.exports = router;