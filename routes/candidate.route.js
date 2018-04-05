var express = require('express');
var candidateController = require('../controllers/candidate.controller');

var router = express.Router();

router.route('/list')
    .get(candidateController.getCandidateList);

module.exports = router;