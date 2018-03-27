require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var nunjucks = require('nunjucks');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var app = express();

/** VIEW ENIGNE SETUP */
/** ------------------------------ */
app.set('views', path.join(__dirname, 'views'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');

/** END OF VIEW ENIGNE SETUP */
/** =============================== */

/** GENERIC MIDDLEWARE SETUP */
/** ------------------------------- */

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'supercat', saveUninitialized: true, resave: true}));

/** END OF GENERIC MIDDLEWARE SETUP */
/** =============================== */

/** KNEX SETUP */
/** ------------------------------- */
var config = require('./knexfile.js');
var knex = require('knex')(config['development']);

knex.migrate.latest([config]);

/** END OF KNEX SETUP */
/** =============================== */

/** ROUTES SETUP */
/** ------------------------------- */

// index
app.use('/', require('./routes/index'));

//GENERIC ROUTES
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/dashboard', require('./routes/dashboard'));

//PROJECTS ROUTES
var projects = require('./routes/projects');
app.use('/projects', projects);


/** END OF ROUTES SETUP */
/** =============================== */

/** ERRORS HANDLING */
/** ------------------------------- */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

/** END OF ERRORS HANDLING */
/** =============================== */

module.exports = app;
