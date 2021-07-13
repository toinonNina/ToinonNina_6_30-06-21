const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
// Controle si l'email de l'utilisateur est déja enregistrer
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/post');



router.post('/create', auth, userCtrl.createPost);
router.post('/update/:id', auth, userCtrl.modifyPost);
router.delete('/delete/:id', auth, userCtrl.deletePost);
router.get('/', auth, userCtrl.getAllPost);
router.get('/:id', auth, userCtrl.getOnePost);


module.exports = router;