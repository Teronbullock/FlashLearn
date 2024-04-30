const Sets = require('../models/sets-model');
const { getCardsBySetID, checkForSet, deleteCardsBySetID } = require('../lib/set-service');
const { asyncHandler } = require('../lib/utils');


// get sets
module.exports.getSets = asyncHandler(
  async (req, res) => {
    // get sets
    const rows = await Sets.findAll({
      raw: true,
      where: { user_id: req.session.userID },
    });

    // get cards for each set
    const setCardCount = [];

    for (const set of rows) {
      const { cardCount } = await getCardsBySetID(set.ID, req.session.userID);
      setCardCount.push({setID: set.ID, cardCount});
    }

    // render sets
    res.render('home', { 
      sets: rows,
      mainClass: 'main-home main-sets',
      cards: setCardCount
    });
  },
  'Error retrieving sets data: ',
  500
);


// get create set
module.exports.getCreateSet = (req, res) => {
  res.render('set-form', {
    view: 'create',
    formScript: true, 
  });
};


// post create set
module.exports.postCreateSet = asyncHandler(
  async (req, res) => {
    const setData = {
      title: req.body.title,
      description: req.body.desc || undefined,
      user_id: req.session.userID,
    };

    if (setData.title) {
      await Sets.create(setData);
      res.redirect('home/' + req.session.userID);
    }
  },
  'Error creating set: ',
  500
);


// get set
module.exports.getSet = asyncHandler(
  async (req, res) => {

    const set = await Sets.findByPk(req.params.setID, { raw: true });
    const { cards } = await getCardsBySetID(req.params.setID, req.session.userID);

    res.render('set', { set, cards, userID: req.session.userID });
  },
  'Error retrieving set data: ',
  500
);


// get edit set
module.exports.getEditSet = asyncHandler(
  async (req, res) => {
    const set = await Sets.findByPk(req.params.setID, {raw: true});
    res.render('set-form', { 
      view: 'edit', 
      set,
      formScript: true, 
    });
  },
  'Error retrieving  set data: ',
  500
);


// post edit set
module.exports.postEditSet = asyncHandler(
  async (req, res) => {
    const setData = {
      title: req.body.title,
      description: req.body.desc || undefined,
    };

    const setID = req.params.setID;

    if (setData.title) {
      await Sets.update(setData, {
        where: {
          ID: setID,
        },
      });
      res.redirect(`/set/${setID}`);
    }
  },
  'Error editing  set: ',
  500
);


// delete set
module.exports.deleteSet = asyncHandler( 
  async (req, res) => {

    // get set
    const set = await checkForSet(req.params.setID, req.session.userID);

    if(set) {

      // delete cards
      await deleteCardsBySetID(req.params.setID, req.session.userID);

      const { cards } = await getCardsBySetID(req.params.setID, req.session.userID);

      // check if cards were deleted
      if (cards.length === 0 || cards === undefined) {
        // delete set
        await Sets.destroy({
          where: {ID: req.params.setID, user_id: req.session.userID}
        });

        console.log(`All cards were deleted for set ${req.params.setID} `);
        console.log('Set ' + req.params.setID + ' is deleted');
      } else {
        const err = new Error(`Error deleting cards for set ${req.params.setID}`);
        err.status = 500;
        throw err;
      }

      res.redirect('/home/' + req.session.userID);
    }
  },
  'Error deleting set: ',
  500
);