var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET Login Page. */
router.get('/', function(req, res, next) {
	res.render('login', { title: 'Choices | Accedi con il tuo account'});
});

module.exports = router;
