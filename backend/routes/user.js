const express = require('express');
const router = express.Router();
const conn = require("../connection");
const userCtlr = require('../controllers/users');

router.post('/signup', userCtlr.signup);

module.exports = router;