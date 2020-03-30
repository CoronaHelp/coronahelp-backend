const db = require("../data/dbConfig");

module.exports = {
  getUsers,
  getUserById,
  create,
  update,
  remove
};

function getUsers() {
  return db("users");
}

function getUserById(id) {
  return db("users")
    .where({ id })
    .select([
      "id",
      "lastName",
      "firstName",
      "email",
      "username",
      "latitude",
      "longitude",
      "address",
      "prefRadius"
    ])
    .first();
}

function create(user) {
  return db("users")
    .insert(user, "id")
    .then(res => {
      return getUserById(res[0]);
    });
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(res => {
      return getUserById(id);
    });
}

function remove(id) {
  return db("users")
    .where("id", id)
    .del();
}
