const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

//get
module.exports = router.get('/', function (req, res, next) {
  (async () => {
    try {
      const cards = await Card.findAll({
        raw: true,
        where: { userID: req.session.userId },
      });

      let numberOfCards = cards.length;
      if (numberOfCards == 0) {
        res.redirect('/add_card');
      } else {
        let flashcardId = Math.floor(Math.random() * numberOfCards);
        res.redirect(`/cards/${flashcardId}`);
      }
    } catch (error) {
      console.log('Error getting db files', error);
      return next(error);
    }
  })();
});

//route parameter
module.exports = router.get('/:id', (req, res, next) => {
  if (!req.session.userId) {
    const err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  }

  (async () => {
    try {
      const cards = await Card.findAll({
        raw: true,
        where: { userID: req.session.userId },
      });

      let { side } = req.query;
      let { id } = req.params;

      if (!side) {
        return res.redirect(`/cards/${id}?side=question`);
      }

      const text = cards[id][side];
      const { hint } = cards[id];
      const templateData = { id, text };

      if (side === 'question') {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
      } else if (side === 'answer') {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
      }

      res.render('card', templateData);
    } catch (error) {}
  })();
});
