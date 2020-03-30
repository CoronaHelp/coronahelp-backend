const express = require("express");
const helmet = require("helmet");

// routes
const {
  locationRoute,
  userRoute,
} = require("../routes/index.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/locations", locationRoute);
server.use("/api/users", userRoute);

server.get("/", (req, res) => res.status(200).json({ message: "UP AND RUNNING" }));

module.exports = server;
