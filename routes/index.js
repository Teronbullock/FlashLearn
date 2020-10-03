const express = require('express');
const router = express.Router();
const mid = require('../middleware');

// GET /
module.exports = router.get('/', (req, res) => {
  res.render('index');
});

// //Other Routes
const cardRoute = require('./cards');
const addCardRoute = require('./add_card');
const welcomeRoute = require('./welcome');
const registerRoute = require('./register');
const loginRoute = require('./login');
const logoutRoute = require('./logout');

router.use('/cards', mid.requireslogin, cardRoute);
router.use('/add_card', mid.requireslogin, addCardRoute);
router.use('/welcome', welcomeRoute);
router.use('/register', mid.loggedOut, registerRoute);
router.use('/login', mid.loggedOut, loginRoute);
router.use('/logout', logoutRoute);
