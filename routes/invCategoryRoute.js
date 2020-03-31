const express = require("express");

const { Cat } = require("../models/index");

const router = express.Router();

router.get("/", async (req, res) => {
  const cats = await Cat.getCats();

  if (cats) {
    res.status(200).json(cats);
  } else {
    res
      .status(500)
      .json({ errorMessage: "Error retrieving inventory categories" });
  }
});

router.post("/", (req, res) => {
  Cat.create(req.body)
    .then(insrtd => {
      res.status(201).json({ created: "success", insrtd });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error creating user" });
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const cat = await Cat.getCatById(id);

  if (cat) {
    res.status(200).json(cat);
  } else {
    res
      .status(500)
      .json({ errorMessage: "Error retrieving specific inventory category" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const cat = await Cat.update(id, req.body);
    if (cat) {
      res.status(200).json({ update: "success", cat });
    } else {
      res
        .status(404)
        .json({ errorMessage: "Category with that ID does not exist" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: `Server failed to update category by id: ${err}` });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const cat = await Cat.getCatById(id);

  if (cat) {
    return Cat.remove(id)
      .then(rmvd => {
        res.status(200).json({ delete: "success", cat });
      })
      .catch(err => {
        res
          .status(500)
          .json({ errorMessage: `Error deleting category: ${err}` });
      });
  } else {
    res.status(404).json({ errorMessage: "Category with that ID does not exist" });
  }
});

module.exports = router;
