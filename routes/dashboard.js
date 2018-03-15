var express = require('express');
var router = express.Router();

/* GET Login Page. */
router.get('/', function(req, res, next) {
	res.render('dashboard', { title: 'Choices | Dashboard'});
});

module.exports = router;
