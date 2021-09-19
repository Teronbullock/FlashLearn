const { Sequelize } = require('sequelize');
require('dotenv').config();

let database = process.env.DATABASE_URL;

module.exports = new Sequelize( database, {
  logging: false,
  storage: './session.postgres',
  pool: {
    max: 15,
    min: 5,
    idle: 20000,
    evict: 15000,
    acquire: 30000,
  },
});
