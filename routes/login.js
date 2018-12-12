var express = require('express');
var router = express.Router();

var baseUrl = process.env.BASE_URL || '';

/* GET Login Page. */
router.get('/', function(req, res, next) {
	res.render('login', { title: 'Choices | Accedi con il tuo account', baseurl: baseUrl });
});

module.exports = router;
