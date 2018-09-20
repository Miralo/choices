exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema.hasTable('projects').then(function(exists) {
			if (!exists) {
				return knex.schema.createTable('projects', function(table) {
					table.increments('uid').primary();
					table.string('title');
					table.timestamp('created_at').defaultTo(knex.fn.now())
					table.string('description');
				});
			}
		})
	])
};

exports.down = function (knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('projects'),
	])
};