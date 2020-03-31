require('dotenv').config();

const knex = require("knex");

const knexConfig = require("../knexfile");

// check to see env is right for purpose 
// staging or development or production
module.exports = knex(knexConfig[ process.env.DB_ENV || "development"]);
