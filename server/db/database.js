const { Sequelize } = require('sequelize');
require('dotenv').config();

let database = process.env.DATABASE_URL;

module.exports = new Sequelize( database, {
  logging: false,
});
