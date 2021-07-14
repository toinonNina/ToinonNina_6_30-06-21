const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
// Controle si l'email de l'utilisateur est déja enregistrer
const userCtrl = require('../controllers/users');
// Controle la forme du mot de pass pour forcé l'utilisateur a le complexifier pour la sécurité
const passwordValidation = require('../middleware/password-validation');
const authUser = require('../middleware/authUser');

/*
router.post('/signup', passwordValidation, userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete/:id', auth, authUser, userCtrl.deleteUser);
router.get('/users', userCtrl.getAllUser);
router.get('/user/:id', userCtrl.getOneUser);
router.post('/update/:id', auth, authUser, userCtrl.modifyUser);*/
// Création d'un utilisateur
router.post('/signup', userCtrl.signup);

// Login d'un utilisateur
router.post('/login', userCtrl.login);

// Récupération d'un seul utilisateur
router.get('/users/:id', auth, authUser, userCtrl.getOneUser);

//Suppression d'un utilisateur
router.delete('/users/:id', auth, authUser, userCtrl.deleteOneUser);

// Modification d'un utilisateur
router.post('/users/:id', auth, authUser, userCtrl.modifyOneUser);

// Vérification de l'utilisateur avec le token
router.get('/auth', auth, userCtrl.authenticate);

module.exports = router;