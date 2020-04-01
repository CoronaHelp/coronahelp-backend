
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('availability').del()
    .then(function () {
      // Inserts seed entries
      return knex('availability').insert([
        {id: 1, name: 'many'},
        {id: 2, name: 'few'},
      ]);
    });
};
