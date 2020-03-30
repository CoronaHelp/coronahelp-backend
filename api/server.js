const express = require("express");
const helmet = require("helmet");

const userRouter = require("../routes/userRoute");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "UP AND RUNNING" });
});

module.exports = server;
