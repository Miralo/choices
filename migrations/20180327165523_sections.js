exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema.hasTable('sections').then(function(exists) {
			if (!exists) {
				return knex.schema.createTable('sections', function(table) {
					table.increments('uid').primary();
					table.string('title');
					table.timestamp('created_at').defaultTo(knex.fn.now())
					table.integer('project_id').unsigned();
					table.foreign('project_id').references('projects.uid').onDelete('cascade')
				});
			}
		})
	])
};

exports.down = function (knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('sections'),
	])
};