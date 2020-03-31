const db = require("../data/dbConfig");

module.exports = {
  getLocationById,
  getLocationsByRadius,
  create,
  update,
  remove
};

function getLocationById(id) {
  return db("locations")
    .where({ id })
    .first();
}

function getLocationsByRadius(lat, lon, radius) {
  // 0.08 === 5 miles
  const extent = (radius * 0.08) / 5;
  const lowerLatLimit = lat - extent;
  const upperLatLimit = lat + extent;
  const lowerLonLimit = lon - extent;
  const upperLonLimit = lon + extent;

  return db("locations")
    .where("latitude", ">", lowerLatLimit)
    .andWhere("latitude", "<", upperLatLimit)
    .andWhere("longitude", ">", lowerLonLimit)
    .andWhere("longitude", "<", upperLonLimit);
}

async function create(location) {
  const { latitude, longitude } = location;
  const previousLocation = await db("locations")
    .where({ latitude, longitude })
    .first();
  if (previousLocation) {
    throw new Error(
      `Location at latitude '${latitude}' and longitude '${longitude}' already exists.`
    );
  }
  return db("locations")
    .insert(location, "id")
    .then(res => getLocationById(res[0]));
}

function update(id, changes) {
  return db("locations")
    .where({ id })
    .update(changes)
    .then(() => getLocationById(id));
}

function remove(id) {
  return db("locations")
    .where({ id })
    .del();
}
