var express = require('express')
  , router = express.Router()

var config = require('../knexfile.js');
var knex = require('knex')(config['development']);

/* Add a new section */
router.post('/add', function(req, res) {
	var title = req.body.title;
	var description = req.body.description;
	var committant = req.body.committant;
	var source = req.body.source;
	var why = req.body.why;
	var id = req.body.section_id;

	knex('choices').insert({title: title, description: description, committant: committant, source: source, why: why, section_id: id}).then(function(result){
		res.json({ success: true });
	});
})

/* View project's sections */
router.get('/get/:section_id', function(req, res) {
	var id = req.params.section_id;
	knex.select().table('choices').where('section_id', id).then(function(item) {
		var result = JSON.stringify(item);
		res.send(result);
	});
})

module.exports = router