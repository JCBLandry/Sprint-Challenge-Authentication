exports.up = function(knex) {
  return knex.schema.createTable('items', items => {
    items.increments();

    items
      .string('name', 255)
      .notNullable();
      items.string('age', 255).notNullable();
      items.string('job', 255).notNullable();
  });
};

exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();

    users
      .string('username', 255)
      .notNullable();
      users.string('password', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
