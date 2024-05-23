const Card = require('../models/cards-model');
const { asyncHandler } = require('../lib/utils');

// get add card
module.exports.getAddCard = (req, res) => {
  const { setID } = req.params;
  res.render('card-form', {
    setID,
    view: 'add',
    userID: req.session.userID,
    cardScript: true, 
  });
};

// post add card
module.exports.postAddCard = asyncHandler( 
  async (req, res, next) => {
    const { setID } = req.params;
    const cardDefinition = req.body.definition ? req.body.definition : 'No definition provided';

    const data = {
      card_term: req.body.term,
      card_definition: cardDefinition,
      user_id: req.session.userID,
      set_id: setID,
      card_color: req.body['card-color'],
      card_text_color: req.body['card-text-color'],
    };

    if (data.card_term && data.card_definition) {
      const card = await Card.create(data);

      console.log('card added');

      // res.redirect(`/set/${setID}`);
      res.render('card-form', {
        view: 'add',
        setID,
        msg: 'Card Added!',
        cardScript: true,
      });
    } else {
      const err = new Error('Please fill in all fields');
      err.status = 400;
      return next(err);
    } 
  },
  'Error creating card: ',
  500
);


// get edit card
module.exports.getEditCard = asyncHandler(
  async (req, res) => {
    const { setID, cardID } = req.params;
    const card = await Card.findByPk(cardID, {raw: true});

    res.render('card-form', { 
      view: 'edit',
      setID, card,
      cardScript: true,
    });
  },
  'Error retrieving card data: ',
  500
);


// put edit card
module.exports.putEditCard = asyncHandler(
  async (req, res) => {
    const { setID, cardID } = req.params;
    const data = {
      card_term: req.body.term,
      card_definition: req.body.definition,
      card_color: req.body['card-color'],
      card_text_color: req.body['card-text-color'],
    };

    if (data.card_term && data.card_definition) {
      const cardUpdate = await Card.update(data, {
        where: { ID: cardID },
      });

      const card = await Card.findByPk(cardID, { raw: true });

      console.log('card updated', cardUpdate);

      res.render('card-form', {
        view: 'edit',
        setID,
        card,
        msg: 'Card Updated!',
      });
    } else {
      const err = new Error('Please fill in all fields');
      err.status = 400;
      return next(err);
    }
  },
  'Error updating card: ',
  500
);


// delete card
module.exports.deleteCard = asyncHandler(
  async (req, res) => {
    const { setID, cardID } = req.params;

    if (req.session.userID !== setID) {
      await Card.destroy({ where: { ID: cardID} });
      
      console.log('card deleted');
      res.redirect(`/set/${setID}`);
    } else {
      const err = new Error(
        'You do not have the correct permission to delete this card'
      );
      err.status = 400;
      return next(err);
    }
  },
  'Error deleting card: ',
  500
);


// get view cards
module.exports.getViewCards = asyncHandler(
  async (req, res) => {
    const setID = req.params.setID;
    const { page } = req.query;
    const nextPage = Number(page) + 1;
    const prevPage = Number(page) - 1;
    
    const {count, rows } = await Card.findAndCountAll({
      where: { set_id: setID },
      raw: true,
      offset: (page - 1),
      limit: 1,
    });

    let cards = rows;


    let templateData = { 
      cardScript: true,
      setID,
      page,
      nextPage,
      prevPage,
      count,
      frontCardText: cards[0]['card_term'],
      backCardText: cards[0]['card_definition'],
      cardColor: cards[0]['card_color'],
      cardTextColor: cards[0]['card_text_color'],
    };

    res.render('card', templateData);
  },
  'Error retrieving cards data: ',
  500
);