const db = require("../data/dbConfig");

module.exports = {
  getCats,
  create,
  getCatById,
  update,
  remove
};

function getCats() {
  return db("inventoryCategory");
}

function getCatById(id) {
  return db("inventoryCategory")
    .where({ id })
    .first();
}

function create(cat) {
  return db("inventoryCategory")
    .insert(cat, "id")
    .then(res => {
      return getCatById(res[0]);
    });
}

function update(id, changes) {
  return db("inventoryCategory")
    .where({ id })
    .update(changes)
    .then(res => {
      return getCatById(id);
    });
}

function remove(id) {
  return db("inventoryCategory")
    .where("id", id)
    .del();
}
