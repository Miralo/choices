var express = require('express')
  , router = express.Router()

var config = require('../knexfile.js');
var knex = require('knex')(config['development']);

/* Add a new section */
router.post('/add', function(req, res) {
	var title = req.body.title;
	var id = req.body.project_id;

	knex('sections').insert({title: title, project_id: id}).then(function(result){
		res.json({ success: true });
	});
})

/* View project's sections */
router.get('/get/:project_id', function(req, res) {
	var id = req.params.project_id;
	knex.select().table('sections').where('project_id', id).then(function(item) {
		var result = JSON.stringify(item);
		res.send(result);
	});
})

module.exports = router