exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema.createTable('projects', function (table) {
			table.increments('uid').primary();
			table.string('title');
			table.date('created_at');
			table.string('description');
		}),
	])
};

exports.down = function (knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('projects'),
	])
};