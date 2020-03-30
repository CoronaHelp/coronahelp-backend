const db = require("../data/dbConfig");

module.exports = {
  getCats,
  create,
  getCatsById
};

function getCats() {
  return db("inventoryCategory");
}

function create(cat) {
  return db("inventoryCategory")
    .insert(cat, "id")
    .then(res => {
      return getCatsById(res[0]);
    });
}

function getCatsById(id) {
  return db("inventoryCategory")
    .where({ id })
    .first();
}
