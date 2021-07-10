const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
// Controle si l'email de l'utilisateur est déja enregistrer
const userCtrl = require('../controllers/users');
// Controle la forme du mot de pass pour forcé l'utilisateur a le complexifier pour la sécurité
const passwordValidation = require('../middleware/password-validation');



router.post('/signup', passwordValidation, userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/delete/:id', auth, userCtrl.deleteUser);
router.get('/users', userCtrl.getAllUser);
router.get('/user/:id', userCtrl.getOneUser);
router.post('/update/:id', auth, userCtrl.modifyUser);


module.exports = router;