
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('inventoryCategory').del()
    .then(function () {
      // Inserts seed entries
      return knex('inventoryCategory').insert([
        {id: 1, name: 'food'},
        {id: 2, name: 'clothes'},
        {id: 3, name: 'toiletries'},
      ]);
    });
};
