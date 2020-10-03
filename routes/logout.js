const express = require('express');
const router = express.Router();

//get
module.exports = router.get('/', (req, res, next ) => {
  if (req.session) {
    // delete session obj
    req.session.destroy( (err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });

  } 

});

