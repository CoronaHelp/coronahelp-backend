const db = require("../data/dbConfig");

module.exports = {
  getItemsByLocationId,
  create,
};

async function getItemsByLocationId(locationID) {
  const locationItems = await db("locationInventory")
    .select("itemID")
    .where({ locationID });
  const itemIDs = locationItems.map(item => item.itemID);
  return db("inventoryItems as ii")
    .select("ii.name", "ic.name as categoryName")
    .whereIn("ii.id", itemIDs)
    .join("inventoryCategory as ic", "ic.id", "ii.categoryID");
};

async function create(locationInvItem) {
  const { locationID, itemID } = locationInvItem;
  const previousLocationInvItem = await db("locationInventory").where({ locationID, itemID }).first();
  if (previousLocationInvItem) throw new Error("That Item has already been created for that location.");
  return db("locationInventory")
    .insert(locationInvItem)
    .then(() => getItemsByLocationId(locationID));
};
