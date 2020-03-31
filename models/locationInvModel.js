const db = require("../data/dbConfig");

module.exports = {
  getItemsByLocationId,
  create,
};

function getItemsByLocationId(locationID) {
  return db("inventoryItems as ii")
    .select("ii.name", "ic.name as categoryName", "a.name as availability")
    .join("locationInventory as li", "li.itemID", "ii.id")
    .join("inventoryCategory as ic", "ic.id", "ii.categoryID")
    .join("availability as a", "a.id", "li.availabilityID")
    .where("li.locationID", locationID);
};

async function create(locationInvItem) {
  const { locationID, itemID } = locationInvItem;
  const previousLocationInvItem = await db("locationInventory").where({ locationID, itemID }).first();
  if (previousLocationInvItem) throw new Error("That Item has already been created for that location.");
  return db("locationInventory")
    .insert(locationInvItem)
    .then(() => getItemsByLocationId(locationID));
};
