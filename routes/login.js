const express = require('express');
const router = express.Router();
const User = require('../models/User');

//get
module.exports = router.get('/', (req, res, next ) => {
  res.render('login');
});

//Post
module.exports = router.post('/', (req, res, next) => {
  if (req.body.username && req.body.password) {
    User.authenticate(req.body.username, req.body.password, (error, user) => {
      if (error || !user) {
        const err = new Error('Wrong username or password.');
        err.status = 401;
        next(err);
      } else {
        req.session.userId = user.userID;
        res.redirect('/welcome');
      }
    });
  
  } else {
    let err = new Error('Email and password are required.');
    err.status = 401;
    next(err);
  }
});
