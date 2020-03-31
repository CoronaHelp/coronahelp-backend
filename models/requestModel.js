const db = require("../data/dbConfig");

module.exports = {
  getRequests,
  getRequestById,
  create,
  update,
  remove
};

function getRequests() {
  return db("requests");
}

function getRequestById(id) {
  return db("requests")
    .where({ id })
    .first();
}

function create(request) {
  return db("requests")
    .insert(request, "id")
    .then(res => getRequestById(res[0]));
}

function update(id, changes) {
  return db("requests")
    .where({ id })
    .update(changes)
    .then(() => getRequestById(id));
}

function remove(id) {
  return db("requests")
    .where("id", id)
    .del();
}
