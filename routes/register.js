const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mid = require('../middleware');

//get
module.exports = router.get('/', (req, res) => {
  res.render('register');
});


//post
module.exports = router.post('/', (req, res, next) => {
   // create object with form input
   const formData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  };

  if (
    formData.username &&
    formData.email &&
    formData.password &&
    formData.confirmPassword
    ) {

      // confirm that user typed same password twice
      if (formData.password !== formData.confirmPassword) {
        let err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }

      // use schema method to insert document into psql
      (async () => {
        try {
          const user = await User.create(formData);
         
          res.redirect('/');
        } catch (error) {
          next(error);
        }
       
      })();

    } else {
      let err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
});

