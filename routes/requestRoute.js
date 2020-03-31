const express = require("express");

const { Request } = require("../models/index");

const router = express.Router();

const restricted = require("../middleware/authenticateMiddleware");

router.get("/", async (req, res) => {
  try {
    const reqs = await Request.getRequests();

    if (reqs) return res.status(200).json(reqs);
    return res.status(404).json({ errorMessage: "No requests to retrieve" });
  } catch (e) {
    return res
      .status(500)
      .json({ errorMessage: `Error retrieving requests: ${e}` });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const request = await Request.getUserById(id);

    if (request) return res.status(200).json(request);
    return res
      .status(404)
      .json({ errorMessage: `No request found with id '${id}'` });
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: `Server failed to get request by id: ${err}` });
  }
});

router.post("/", (req, res) => {
  return Request.create(req.body)
    .then(created => res.status(201).json({ created: "success", created }))
    .catch(err =>
      res.status(500).json({ errorMessage: `Error creating request: ${err}` })
    );
});

module.exports = router;
