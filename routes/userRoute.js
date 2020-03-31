const express = require("express");

const { User } = require("../models/index");

const router = express.Router();

const restricted = require("../middleware/authenticateMiddleware");

router.get("/", async (req, res) => {
  try {
    const users = await User.getUsers();

    if (users) return res.status(200).json(users);
    return res.status(404).json({ errorMessage: "No users to retrieve" });
  } catch (e) {
    return res
      .status(500)
      .json({ errorMessage: `Error retrieving users: ${e}` });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.getUserById(id);
    if (user) return res.status(200).json(user);
    return res
      .status(404)
      .json({ errorMessage: `No user found with id '${id}'` });
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: `Server failed to get user by id: ${err}` });
  }
});

router.post("/", restricted, (req, res) => {
  return User.create(req.body)
    .then(insrtd => res.status(201).json(insrtd))
    .catch(err =>
      res.status(500).json({ errorMessage: `Error creating user: ${err}` })
    );
});

router.delete("/:id", restricted, async (req, res) => {
  const id = req.params.id;
  const user = await User.getUserById(id);

  if (user) {
    return User.remove(id)
      .then(rmvd => res.status(200).json(user))
      .catch(err =>
        res.status(500).json({ errorMessage: `Error deleting user: ${err}` })
      );
  }
  return res
    .status(404)
    .json({ errorMessage: `No user to delete found with id '${id}'` });
});

router.put("/:id", restricted, async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.update(id, req.body);
    if (user) return res.status(200).json(user);
    return res
      .status(404)
      .json({ errorMessage: `No user found with id '${id}'` });
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: `Server failed to update user by id: ${err}` });
  }
});

module.exports = router;
