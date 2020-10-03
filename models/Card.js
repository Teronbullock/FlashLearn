const { Sequelize, DataTypes } = require('sequelize');
const db = require('../util/database');


const Card = db.define('Card', {
  cardID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hint: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'No hint add'
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  
});


(async () => {
  try {
    await Card.sync();
    console.log('The table for the Card model is synced');
  } catch (error) {
    console.log('Error: The table for the Card model was not syned.', error);
  }
})();

module.exports = Card;