const db = require("../data/dbConfig");

module.exports = {
  getRequests,
  getRequestById,
  create
};

function getRequests() {
  return db("requests");
}

function getRequestById(id) {
  return db("requests")
    .where({ id })
    .select([
      "id",
      "title",
      "description",
      "createdTimestamp",
      "userID",
      "itemID",
      "fulfilled",
      "fulfilledUserID",
      "fulfilledTimestamp"
    ])
    .first();
}

function create(request) {
  return db("requests")
    .insert(request, "id")
    .then(res => getRequestById(res[0]));
}
