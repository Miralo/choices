var express = require('express');
var router = express.Router();

var baseUrl = process.env.BASE_URL || '';

/* GET Login Page. */
router.get('/', function(req, res, next) {
	res.render('dashboard', { title: 'Choices | Dashboard', baseurl: baseUrl });
});

module.exports = router;
