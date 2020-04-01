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
        .inTable("locations");

      tbl
        .integer("itemID")
        .references("id")
        .inTable("inventoryItems");

      tbl
        .integer("availabilityID")
        .references("id")
        .inTable("availability");
    })

    .createTable("requests", tbl => {
      tbl.increments();

      tbl.string("title", 50).notNullable();

      tbl.string("description");

      tbl
        .datetime("createdTimestamp")
        .defaultTo(knex.fn.now())
        .notNullable();

      tbl
        .integer("userID")
        .references("id")
        .inTable("users")
        .notNullable();

      tbl
        .integer("itemID")
        .references("id")
        .inTable("inventoryItems")
        .notNullable();

      tbl
        .boolean("fulfilled")
        .notNullable()
        .defaultTo(0);

      tbl
        .integer("fulfilledUserID")
        .references("id")
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
