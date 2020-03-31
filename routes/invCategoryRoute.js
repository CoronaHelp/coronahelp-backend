const express = require("express");

const { Cat } = require("../models/index");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cats = await Cat.getCats();

    if (cats) return res.status(200).json(cats);
    return res
      .status(404)
      .json({ errorMessage: "No inventory categories to retrieve" });
  } catch (e) {
    return res
      .status(500)
      .json({ errorMessage: `Error retrieving inventory categories: ${e}` });
  }
});

router.post("/", (req, res) => {
  return Cat.create(req.body)
    .then(insrtd => res.status(201).json({ created: "success", insrtd }))
    .catch(err =>
      res.status(500).json({ errorMessage: `Error creating user: ${err}` })
    );
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const cat = await Cat.getCatById(id);

    if (cat) return res.status(200).json(cat);
    return res
      .status(404)
      .json({ errorMessage: `No inventory category found with id '${id}'` });
  } catch (e) {
    return res
      .status(500)
      .json({ errorMessage: `Error retrieving an inventory category: ${e}` });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const cat = await Cat.update(id, req.body);
    if (cat) return res.status(200).json({ update: "success", cat });
    return res
      .status(404)
      .json({ errorMessage: `Category with id '${id}' does not exist` });
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: `Server failed to update category by id: ${err}` });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const cat = await Cat.getCatById(id);

    if (cat) {
      return Cat.remove(id)
        .then(() => res.status(200).json({ delete: "success", cat }))
        .catch(err =>
          res
            .status(500)
            .json({ errorMessage: `Error deleting category: ${err}` })
        );
    }
    return res
      .status(404)
      .json({ errorMessage: `Category with id '${id}' does not exist` });
  } catch (e) {
    return res
      .status(500)
      .json({ errorMessage: `Error deleting category: ${e}` });
  }
});

module.exports = router;
