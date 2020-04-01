const express = require("express");

const {
  LocationInv,
} = require("../models/index");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const items = await LocationInv.getItemsByLocationId(id);
    // even if there are no items in that location, return an empty array
    return res.status(200).json(items);
  } catch (e) {
    return res.status(500).json({ errorMessage: `Error getting items at location: ${ e }` });
  }
});

router.post("/", (req, res) => {
  return LocationInv.create(req.body)
    .then(insrtd => res.status(201).json(insrtd))
    .catch(err => res.status(500).json({ errorMessage: `Error adding item to location: ${ err }` }));
});

module.exports = router;
