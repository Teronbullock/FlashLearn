const express = require('express');
const router = express.Router();
const Card = require('../models/Card')
//get
module.exports = router.get('/', (req, res) => {
  res.render('add_card');
});

//post
module.exports = router.post('/', (req, res, next) => {
  console.log('post', req.session.userId);
  const cardData = {
    question: req.body.question,
    hint: req.body.hint,
    answer: req.body.answer,
    userID: req.session.userId
  };

  if (
    cardData.question &&
    cardData.answer
    ) {
      (async () => {
        try {
          const card = await Card.create(cardData);
          console.log('card added' );
          res.redirect('/add_card');
        } catch (error) {
          next( error);
        }
        

      })();
    }

});