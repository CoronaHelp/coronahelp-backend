const express = require("express");

const { Location } = require("../models/index");

const router = express.Router();

router.get("/id/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const location = await Location.getLocationById(id);
    if (location) return res.status(200).json(location);
    return res.status(404).json({ errorMessage: "No location with that ID" });
  } catch (e) {
    return res.status(500).json({ errorMessage: `Error getting location: ${ e }` });
  }
});

router.get("/radius/:radius/:lat/:lon", async (req, res) => {
  const { radius, lat, lon } = req.params;

  const latitude = parseFloat(lat);
  if (!latitude) return res.status(400).json({ errorMessage: `Latitude '${ lat }' is not a number.` });

  const longitude = parseFloat(lon);
  if (!longitude) return res.status(400).json({ errorMessage: `Longitude '${ lon }' is not a number.` });

  try {
    const locations = await Location.getLocationsByRadius(latitude, longitude, radius);
    if (locations.length) return res.status(200).json(locations);
    return res.status(404).json({ errorMessage: "No locations within that radius found" });
  } catch (e) {
    return res.status(500).json({ errorMessage: `Error getting location: ${ e }` });
  }
});

router.post("/", (req, res) => {
  return Location.create(req.body)
    .then(insrtd => res.status(201).json(insrtd))
    .catch(err => res.status(500).json({ errorMessage: `Error creating location: ${ err }` }));
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const location = await Location.getLocationById(id);

    if (location) {
      return Location.remove(id)
        .then(() => res.status(200).json({ delete: "success", location }))
        .catch(err => res.status(500).json({ errorMessage: `Error deleting location: ${ err }` }));
    }
    return res.status(404).json({ errorMessage: "No location with that ID" });
  } catch (e) {
    return res.status(500).json({ errorMessage: `Error getting location to delete: ${ err }` });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;

  return Location.update(id, req.body)
    .then(updtd => res.status(201).json({ update: "success", updtd }))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
