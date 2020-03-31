const express = require("express");

const { User } = require("../models/index");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.getUsers();

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(500).json({ errorMessage: "Error retrieving users" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ errorMessage: "No user with that ID" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: `Server failed to get user by id: ${err}` });
  }
});

router.post("/", (req, res) => {
  User.create(req.body)
    .then(insrtd => {
      res.status(201).json({ created: "success", insrtd });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error creating user" });
    });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.getUserById(id);

  if (user) {
    return User.remove(id)
      .then(rmvd => {
        res.status(200).json({ delete: "success", user });
      })
      .catch(err => {
        res.status(500).json({ errorMessage: `Error deleting user: ${err}` });
      });
  } else {
    res.status(404).json({ errorMessage: "Error finding that user" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.update(id, req.body);
    console.log("update user", user);
    if (user) {
      res.status(200).json({ update: "success", user });
    } else {
      res.status(404).json({ errorMessage: "User with that ID does not exist" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: `Server failed to update user by id: ${err}` });
  }
});

module.exports = router;
