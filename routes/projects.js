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

	knex('projects').insert({title: title, description: description}).then(function(result){
		res.json({ success: true });
	});
})

/* View a single project */
router.get('/view/:id', function(req, res) {
	var id = req.params.id;

	knex.select().table('projects').where('uid', id).then(function(item) {
		var result = JSON.stringify(item);
		res.render('single_project', { title: 'Choices | ' + item[0].title, project: result });
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

router.delete('/delete/:id', function(req, res) {
	var id = req.params.id;
	var project_sections = null;

	//Seleziono le sezioni del progetto
	knex.select('id').table('sections').where('project_id', id).then(function(items) {
		project_sections = items;
	});

	//Cancello le scelte appartenenti alle sezioni del progetto
	knex('choices').whereIn('section_id', project_sections).del().then(function (count) {})

	//Cancello le sezioni e il progetto stesso
	knex('sections').where('project_id', id).del().then(function (count) {})
	knex('projects').where('uid', id).del().then(function (count) {})
})

module.exports = router