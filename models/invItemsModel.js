const db = require("../data/dbConfig");

module.exports = {
	getItems,
	getItemById,
	create,
	update,
	remove,
};

async function getItems() {
  return db("inventoryItems as ii")
    .select("ii.id", "ii.name", "ic.name as categoryName")
    .join("inventoryCategory as ic", "ic.id", "ii.categoryID");
};

function getItemById(id) {
  return db("inventoryItems")
    .where({ id })
    .first();
};

async function create(item) {
	const { name, categoryID } = item;
	const previousItem = await db("inventoryItems as ii")
		.select("ii.name", "ic.name as categoryName")
		.where("ii.name", name)
		.andWhere("ii.categoryID", categoryID)
		.join("inventoryCategory as ic", "ic.id", "ii.categoryID")
		.first();
  if (previousItem) {
    throw new Error(`Item '${ name }' in category '${ previousItem.categoryName }' already exists.`);
  }
  return db("inventoryItems")
    .insert(item, "id")
    .then(res => getItemById(res[0]));
};

function update(id, changes) {
  return db("inventoryItems")
    .where({ id })
    .update(changes)
    .then(() => getItemById(id));
};

function remove(id) {
  return db("inventoryItems")
    .where({ id })
    .del();
};
