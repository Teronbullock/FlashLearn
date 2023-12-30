const Cards = require('../models/cards-model');
const Sets = require('../models/sets-model');

// get card by set id
module.exports.getCardsBySetID = async (setID, userID) => {
  const {count, rows } = await Cards.findAndCountAll({
    raw: true,
    where: { user_id: userID, set_id: setID },
  });

  let cards = rows;
  let cardCount = count;

  return { cards, cardCount };
};


// check for set
module.exports.checkForSet = async (setID, userID) => {
  const set = await Sets.findByPk(setID, { raw: true });

  if (!set) {
    const err = new Error('Set not found');
    err.status = 404;
    throw err;
  }

  if (set.user_id !== userID) {
    const err = new Error('Your not authorized to edit this set');
    err.status = 403;
    throw err;
  }

  return true;
};

// delete cards by set id
module.exports.deleteCardsBySetID = async (setID, userID) => {
  await Cards.destroy({
    where: { user_id: userID, set_id: setID },
  });
};