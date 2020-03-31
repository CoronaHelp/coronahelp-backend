const express = require("express");

const {
  InvItems,
} = require("../models/index");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await InvItems.getItems();
    // even if there are no items currently, return an empty array
    return res.status(200).json(items);
  } catch (e) {
    return res.status(500).json({ errorMessage: `Error getting items: ${ e }` });
  }
});

router.get("/id/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const item = await InvItems.getItemById(id);
    if (item) return res.status(200).json(item);
    return res.status(404).json({ errorMessage: `No item with id '${ id }'` });
  } catch (e) {
    return res.status(500).json({ errorMessage: `Error getting item by id: ${ e }` });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const item = await InvItems.getItemById(id);

    if (item) {
      return InvItems.remove(id)
        .then(() => res.status(200).json({ delete: "success", item }))
        .catch(err => res.status(500).json({ errorMessage: `Error deleting item: ${ err }` }));
    }
    return res.status(404).json({ errorMessage: `No item to delete with id '${ id }'` });
  } catch (e) {
    return res.status(500).json({ errorMessage: `Error getting item to delete: ${ err }` });
  }
});

router.post("/", (req, res) => {
  return InvItems.create(req.body)
    .then(insrtd => res.status(201).json(insrtd))
    .catch(err => res.status(500).json({ errorMessage: `Error creating item: ${ err }` }));
});

router.put("/:id", (req, res) => {
  const id = req.params.id;

  return InvItems.update(id, req.body)
    .then(updtd => res.status(201).json({ update: "success", updtd }))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
