const db = require("../data/dbConfig");

module.exports = {
  getUsers,
  getUserById,
  insert
};

function getUsers() {
  return db("users");
}

function getUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function insert(user) {
  return db("users")
    .insert(user, "id")
    .then(res => {
      return getUserById(res[0]);
    });
}
