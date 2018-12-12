var express = require('express');
var router = express.Router();

var baseUrl = process.env.BASE_URL || '';

/* GET Register Page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Choices | Registra un nuovo account', baseurl: baseUrl });
});

module.exports = router;
