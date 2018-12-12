var express = require('express');
var passport = require('passport');
var router = express.Router();

var baseUrl = process.env.BASE_URL || '';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Choices | Homepage', baseurl: baseUrl });
});

module.exports = router;