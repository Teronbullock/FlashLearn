const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const { Op } = require("sequelize");

//get
module.exports = router.get('/', function(req, res, next) {
  (async () => {
    try {
      const cards = await Card.findAll({
        raw: true,
        where: {
          [Op.or]: [
            { userID: req.session.userId },
            { userID: 0 }
          ]
        }
      });

      let numberOfCards = cards.length;

      if (numberOfCards == 0) {
        res.redirect('/add_card');
      } else {  
        let flashcardId = Math.floor( Math.random() * numberOfCards );
        res.redirect( `/cards/${flashcardId}` );
      }  
      
    } catch (error) {
      console.log('Error getting db files',error);
      return next(error);
    }
  
  })();

});

module.exports = router.get('/:id', (req, res, next) => {

  if (! req.session.userId ) {
    const err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);
  }

  (async () => {
    try {
      const cards = await Card.findAll({
        raw: true,
        where: {
          [Op.or]: [
            { userID: req.session.userId },
            { userID: 0 }
          ]
        }
      });
      let { side } = req.query;
      let { id } = req.params;
     
      if ( !side ) {
        return  res.redirect(`/cards/${id}?side=question`);
      }

      const name = req.cookies.username;
      const text = cards[id][side];
      const { hint } = cards[id];
    
      const templateData = { id, text, name };

    if ( side === 'question' ) {
      templateData.name = 'Joe';
      templateData.hint = hint;
      templateData.sideToShow = 'answer';
      templateData.sideToShowDisplay = 'Answer';
    } else if ( side === 'answer' ) {
      templateData.sideToShow = 'question';
      templateData.sideToShowDisplay = 'Question';
    }

    res.render('card', templateData);
    } catch (error) {
      
    }
    
  })();
  
    
});





