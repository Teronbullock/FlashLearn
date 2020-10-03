const express = require('express');
const router = express.Router();
const mainRoute = require('./index');

module.exports = router.get('/', (req, res) => {
  res.render('welcome');
});