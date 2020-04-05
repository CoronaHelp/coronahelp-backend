const db = require("../data/dbConfig");

module.exports = {
  getRequests,
  getRequestById,
  create,
  update,
  remove
};

function getRequests(lat, lon, radius) {
  // 0.08 === 5 miles
  const extent = (radius * 0.24) / 5;
  const lowerLatLimit = lat - extent;
  const upperLatLimit = lat + extent;
  const lowerLonLimit = lon - extent;
  const upperLonLimit = lon + extent;

  return db("requests as r")
    .select(
      "r.id",
      "r.title",
      "r.description",
      "u.username",
      "r.createdTimestamp",
      "ii.name as item",
      "ic.name as category"
    )
    .join("users as u", "u.id", "r.userID")
    .join("inventoryItems as ii", "ii.id", "r.itemID")
    .join("inventoryCategory as ic", "ic.id", "ii.categoryID")
    .where("u.latitude", ">", lowerLatLimit)
    .andWhere("u.latitude", "<", upperLatLimit)
    .andWhere("u.longitude", ">", lowerLonLimit)
    .andWhere("u.longitude", "<", upperLonLimit)
    .andWhere("r.fulfilled", false)
    .orderBy("r.id", "desc");
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
