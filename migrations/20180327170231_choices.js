exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema.hasTable('choices').then(function(exists) {
			if (!exists) {
				return knex.schema.createTable('choices', function(table) {
					table.increments('uid').primary();
					table.string('title');
					table.timestamp('created_at').defaultTo(knex.fn.now())
					table.string('description');
					table.string('committant');
					table.string('why');
					table.string('source');
					table.integer('section_id').unsigned();
					table.foreign('section_id').references('sections.uid').onDelete('cascade')
				});
			}
		})
	])
};

exports.down = function (knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('choices'),
	])
};