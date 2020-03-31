
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('locationInventory').del()
    .then(function () {
      // Inserts seed entries
      return knex('locationInventory').insert([
        {id: 1, locationID: 1, itemID: 1, availabilityID: 1 },
        {id: 1, locationID: 1, itemID: 3, availabilityID: 2 },
        {id: 2, locationID: 2, itemID: 1, availabilityID: 2 },
        {id: 2, locationID: 2, itemID: 2, availabilityID: 2 },
        {id: 3, locationID: 3, itemID: 2, availabilityID: 1 },
        {id: 3, locationID: 3, itemID: 3, availabilityID: 1 },
      ]);
    });
};
