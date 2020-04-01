exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();

      tbl.string("lastName");

      tbl.string("firstName");

      tbl.string("email").notNullable();

      tbl
        .string("username")
        .notNullable()
        .unique();

      tbl.float("latitude");

      tbl.float("longitude");

      tbl.integer("zipcode");

      tbl.string("password").notNullable();

      tbl.integer("prefRadius");
    })

    .createTable("locations", tbl => {
      tbl.increments();

      tbl.string("name").notNullable();

      tbl.string("address").notNullable();

      tbl.float("latitude").notNullable();

      tbl.float("longitude").notNullable();
    })

    .createTable("inventoryCategory", tbl => {
      tbl.increments();

      tbl.string("name").notNullable();
    })

    .createTable("inventoryItems", tbl => {
      tbl.increments();

      tbl.string("name").notNullable();

      tbl
        .integer("categoryID")
        .references("id")
        .onDelete("CASCADE") // when category is deleted, item in that category is also deleted
        .inTable("inventoryCategory");
    })

    .createTable("availability", tbl => {
      tbl.increments();

      tbl.string("name").notNullable();
    })

    .createTable("locationInventory", tbl => {
      tbl.increments();

      tbl
        .integer("locationID")
        .references("id")
        .onDelete("CASCADE") // when location is deleted all its inventory is also deleted
        .inTable("locations");

      tbl
        .integer("itemID")
        .references("id")
        .onDelete("CASCADE") // when item is deleted, it is also deleted from any location inventory
        .inTable("inventoryItems");

      tbl
        .integer("availabilityID")
        .references("id")
        // when availability is deleted(side note: it won't ever be deleted), delete the location inventory
        .onDelete("CASCADE")
        .inTable("availability");
    })

    .createTable("requests", tbl => {
      tbl.increments();

      tbl.string("title", 50).notNullable();

      tbl.string("description");

      tbl.datetime("createdTimestamp").notNullable();

      tbl
        .integer("userID")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE") // when user that made the request is deleted, the request is also deleted
        .notNullable();

      tbl
        .integer("itemID")
        .references("id")
        .onDelete("CASCADE") // when item is deleted, any requests for that item are also deleted
        .inTable("inventoryItems")
        .notNullable();

      tbl.boolean("fulfilled").notNullable();

      tbl
        .integer("fulfilledUserID")
        .references("id")
        .onDelete("SET NULL") // when user who fulfilled request is deleted, leave the request up
        .inTable("users");

      tbl.datetime("fulfilledTimestamp");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("requests")
    .dropTableIfExists("locationInventory")
    .dropTableIfExists("availability")
    .dropTableIfExists("inventoryItems")
    .dropTableIfExists("inventoryCategory")
    .dropTableIfExists("locations")
    .dropTableIfExists("users");
};
