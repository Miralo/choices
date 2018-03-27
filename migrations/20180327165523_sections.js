exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema.createTable('sections', function (table) {
			table.increments('uid').primary();
			table.string('title');
			table.date('created_at');
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