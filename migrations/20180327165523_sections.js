exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema.createTableIfNotExists('sections', function (table) {
			table.increments('uid').primary();
			table.string('title');
			table.timestamp('created_at').defaultTo(knex.fn.now())
			table.integer('project_id').unsigned();
			table.foreign('project_id').references('projects.uid')
		}),
	])
};

exports.down = function (knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('sections'),
	])
};