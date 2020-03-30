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

module.exports = router;
