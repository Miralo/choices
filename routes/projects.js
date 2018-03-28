var express = require('express')
  , router = express.Router()

//var config = require('../knexfile.js');
//var knex = require('knex')(config['development']);

/* GET Projects Page. */
router.get('/', function(req, res, next) {
	res.render('projects', { title: 'Choices | I tuoi progetti'});
});

router.post('/add', function(req, res) {
	var title = req.body.title;
	var description = req.body.description;
	var date = req.body.date;

	knex('projects').insert({title: title, description: description, created_at: date}).then(function(result){
		res.json({ success: true });
	});
})

// Elenco lista
/*router.get('/spesa', function(req, res) {
	knex.select().table('lista_spesa').then(function(items) {
		var stringa = JSON.stringify(items);
		res.render('spesa', { title: 'Lista della spesa', lista_spesa: stringa, user: req.user });
	});
})*/

/*
router.post('/spesa/edit/:id', function(req, res) {
	var id = req.params.id;
	var state = req.body.state;

	knex('lista_spesa').where('uid', id).update({state: state}).then(function (count) {
		res.json({ success: true, message: 'ok' });
	})
})

router.delete('/spesa/edit/:id', function(req, res) {
	var id = req.params.id;

	knex('lista_spesa').where('uid', id).del().then(function (count) {
		res.json({ success: true, message: 'ok' });
	})
})

// Elenco ricette
router.get('/ricette', function(req, res) {
	knex.select().table('ricette').then(function(items) {
		var stringa = JSON.stringify(items);
		res.render('ricette', { title: 'Ricette buonissime', ricette: stringa, user: req.user });
	});
})*/

module.exports = router