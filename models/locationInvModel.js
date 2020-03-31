const db = require("../data/dbConfig");

module.exports = {
  getItemsByLocationId,
};

async function getItemsByLocationId(locationID) {
  const itemIDs = await db("locationInventory")
    .select("itemID", "availabilityID")
    .where({ locationID });
  return db("inventoryItems")
    .whereIn("id", itemIDs);
};
