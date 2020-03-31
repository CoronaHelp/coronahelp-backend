const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// routes
const {
  authRoute,
  locationRoute,
  userRoute,
  invCatRoute
} = require("../routes/index.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRoute);
server.use("/api/locations", locationRoute);
server.use("/api/users", userRoute);
server.use("/api/categories", invCatRoute);

server.get("/", (req, res) =>
  res.status(200).json({ message: "UP AND RUNNING" })
);

module.exports = server;
