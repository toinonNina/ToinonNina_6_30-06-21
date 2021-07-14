const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authComm = require('../middleware/authComm');

const userCtrl = require('../controllers/comment');


// Création d'un post 
router.post('/create/:id', auth, userCtrl.createOneComment);
router.get('/:id', auth, userCtrl.getCommentsfromPost);
router.delete('/delete/:id', auth, authComm, userCtrl.deleteOneComment);
router.post('/udapte/:id', auth, authComm, userCtrl.modifyOneComment);
module.exports = router;