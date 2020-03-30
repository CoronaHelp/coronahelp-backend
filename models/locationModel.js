const db = require("../data/dbConfig");

module.exports = {
	getLocationById,
	create,
};

function getLocationById(id) {
  return db("locations")
    .where({ id })
    .first();
};

function create(location) {
  return db("locations")
    .insert(location, "id")
    .then(res => {
      return getLocationById(res[0]);
    });
};
