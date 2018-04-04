var express = require('express');
var userController = require('../controllers/user.controller');

var router = express.Router();

router.route('/login')
    .post(userController.postLogin);

module.exports = router;