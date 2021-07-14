const express = require('express');
const router = express.Router();
// Controle si l'email de l'utilisateur est déja enregistrer
const auth = require('../middleware/auth');
const authPost = require('../middleware/authPost');

const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/post');



router.post('/create', auth, multer, userCtrl.createPost);
router.post('/:id', auth, multer, authPost, userCtrl.modifyOnePost);
router.delete('/:id', auth, userCtrl.deletePost);
router.get('/:id', auth, userCtrl.getOnePost);
router.get('/', auth, userCtrl.getAllPost);
module.exports = router;