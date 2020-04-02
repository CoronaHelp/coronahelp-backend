
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('requests').del()
    .then(function () {
      // Inserts seed entries
      return knex('requests').insert([
        {
          id: 1,
          title: 'request #1',
          description: 'This is test request number one.',
          createdTimestamp: knex.fn.now(),
          userID: 1,
          itemID: 1,
          fulfilled: false,
        },
        {
          id: 2,
          title: 'request #2',
          createdTimestamp: knex.fn.now(),
          userID: 1,
          itemID: 2,
          fulfilled: false,
        },
        {
          id: 3,
          title: 'request #3',
          description: 'This is test request number three.',
          createdTimestamp: knex.fn.now(),
          userID: 2,
          itemID: 3,
          fulfilled: false,
        },
      ]);
    });
};
