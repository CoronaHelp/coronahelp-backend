
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('inventoryItems').del()
    .then(function () {
      // Inserts seed entries
      return knex('inventoryItems').insert([
        {id: 1, name: 'apples', categoryID: 1 },
        {id: 2, name: 'bananas', categoryID: 1 },
        {id: 3, name: 'shirts', categoryID: 2 },
        {id: 4, name: 'pants', categoryID: 2 },
        {id: 5, name: 'toilet paper', categoryID: 3 },
      ]);
    });
};
