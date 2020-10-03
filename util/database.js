const { Sequelize } = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(`${process.env.DATABASE_URL}`, {
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
