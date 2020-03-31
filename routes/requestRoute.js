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
    const request = await Request.getRequestById(id);

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

router.post("/", restricted, (req, res) => {
  return Request.create(req.body)
    .then(created => res.status(201).json({ created: "success", created }))
    .catch(err =>
      res.status(500).json({ errorMessage: `Error creating request: ${err}` })
    );
});

router.delete("/:id", restricted, async (req, res) => {
  const id = req.params.id;
  const request = await Request.getRequestById(id);

  if (request) {
    return Request.remove(id)
      .then(rmvd => res.status(200).json(request))
      .catch(err =>
        res.status(500).json({ errorMessage: `Error deleting request: ${err}` })
      );
  }
  return res
    .status(404)
    .json({ errorMessage: `No user to delete found with id '${id}'` });
});

router.put("/:id", restricted, async (req, res) => {
  const id = req.params.id;

  try {
    const request = await Request.update(id, req.body);
    if (request) return res.status(200).json(request);
    return res
      .status(404)
      .json({ errorMessage: `No user request with id '${id}'` });
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: `Server failed to request user by id: ${err}` });
  }
});

module.exports = router;
