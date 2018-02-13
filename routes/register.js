var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET Register Page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Choices | Registra un nuovo account'});
});

module.exports = router;
