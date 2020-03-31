
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        {id: 1, name: 'Adam\'s Warehouse', address: '123 Adam St.', latitude: 10.123456, longitude: 10.123456 },
        {id: 2, name: 'Brian\'s Supermarket', address: '123 Brian St.', latitude: 11.123456, longitude: 11.123456 },
        {id: 3, name: 'Carol\'s Pharmacy', address: '123 Carol St.', latitude: 12.123456, longitude: 12.123456 },
      ]);
    });
};
