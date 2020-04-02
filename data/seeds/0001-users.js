exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          lastName: "Lastington",
          firstName: "Firstington",
          email: "email@aol.com",
          username: "Mr.User",
          latitude: -118.4105,
          longitude: 34.103,
          zipcode: 90210,
          password: "password123",
          prefRadius: 2
        },
        {
          id: 2,
          lastName: "Lastington2",
          firstName: "Firstington2",
          email: "email2@aol.com",
          username: "Mr.User2",
          latitude: -74.93604089999997,
          longitude: 41.84983090000003,
          zipcode: 90241,
          password: "password123",
          prefRadius: 1
        }
      ]);
    });
};
