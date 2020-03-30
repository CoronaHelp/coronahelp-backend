const express = require("express");

const { Location } = require("../models/index");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const location = await Location.getLocationById(id);

  if (location) return res.status(200).json(location);
  else return res.status(404).json({ errorMessage: "No location with that ID" });
});

router.post("/", (req, res) => {
  return Location.create(req.body)
    .then(insrtd => res.status(201).json(insrtd))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
