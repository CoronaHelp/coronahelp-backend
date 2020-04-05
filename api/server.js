const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require('morgan');

// routes
const {
  authRoute,
  locationRoute,
  userRoute,
  invCatRoute,
  invItemsRoute,
  locationInvRoute,
  requestRoute
} = require("../routes/index.js");

const enableCors = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

// const corsOptions = {
// 	origin: function (origin, callback) {
// 		if (origin === process.env.FRONTEND_URL || !origin) return callback(null, true);
// 		return callback(new Error('Not allowed by CORS'));
// 	},
// 	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

const server = express();

server.use(
  express.json(),
  enableCors,
  // cors(corsOptions),
  cors(),
  helmet(),
  morgan('short'),
);

server.use("/api/auth", authRoute);
server.use("/api/users", userRoute);
server.use("/api/categories", invCatRoute);
server.use("/api/items", invItemsRoute);
server.use("/api/location-inventory", locationInvRoute);
server.use("/api/locations", locationRoute);
server.use("/api/requests", requestRoute);

server.get("/", (req, res) => res.status(200).json({ message: "UP AND RUNNING" }));

module.exports = server;
