var express = require('express')
  , router = express.Router()

var config = require('../knexfile.js');
var knex = require('knex')(config['development']);

/* GET Projects Page. */
router.get('/', function(req, res, next) {
	knex.select().table('projects').then(function(items) {
		var results = JSON.stringify(items);
		res.render('projects', { title: 'Choices | I tuoi progetti', projects: results });
	});
});

/* Add a new project */
router.post('/add', function(req, res) {
	var title = req.body.title;
	var description = req.body.description;
	var date = req.body.date;

	knex('projects').insert({title: title, description: description, created_at: date}).then(function(result){
		res.json({ success: true });
	});
})

router.get('/view/:id', function(req, res) {
	var id = req.params.id;

	knex.select().table('projects').where('uid', id).then(function(item) {
		var result = JSON.stringify(item);
		res.render('single_project', { title: 'Choices | ' + item.title, project: result });
	});
})

router.post('/edit/:id', function(req, res) {
	var id = req.params.id;
	var title = req.body.title;
	var description = req.body.description;

	knex('projects').where('uid', id).update({title: title, description: description}).then(function (count) {
		res.json({ success: true, message: 'ok' });
	})
})

router.delete('/edit/:id', function(req, res) {
	var id = req.params.id;

	knex('projects').where('uid', id).del().then(function (count) {
		res.json({ success: true, message: 'ok' });
	})
})

module.exports = router