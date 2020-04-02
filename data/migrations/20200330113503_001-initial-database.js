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
        .unsigned()
        .references("inventoryCategory.id")
        .onDelete("CASCADE"); // when category is deleted, item in that category is also deleted
    })

    .createTable("availability", tbl => {
      tbl.increments();

      tbl.string("name").notNullable();
    })

    .createTable("locationInventory", tbl => {
      tbl.increments();

      tbl
        .integer("locationID")
        .unsigned()
        .notNullable()
        .references("locations.id")
        .onDelete("CASCADE"); // when location is deleted all its inventory is also deleted

      tbl
        .integer("itemID")
        .unsigned()
        .references("inventoryItems.id")
        .onDelete("CASCADE"); // when item is deleted, it is also deleted from any location inventory

      tbl
        .integer("availabilityID")
        .unsigned()
        .references("availability.id")
        // when availability is deleted(side note: it won't ever be deleted), delete the location inventory
        .onDelete("CASCADE");
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
        .notNullable()
        .references("users.id")
        .onDelete("CASCADE"); // when user that made the request is deleted, the request is also deleted

      tbl
        .integer("itemID")
        .notNullable()
        .references("inventoryItems.id")
        .onDelete("CASCADE"); // when item is deleted, any requests for that item are also deleted

      tbl
        .boolean("fulfilled")
        .notNullable()
        .defaultTo(0);

      tbl
        .integer("fulfilledUserID")
        .references("users.id")
        .onDelete("SET NULL"); // when user who fulfilled request is deleted, leave the request up

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
