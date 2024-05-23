const { DataTypes } = require('sequelize');
const db = require('../db/database');
const User = require('./users-model');
const Sets = require('./sets-model');


const Card = db.define('fc_card', {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'ID',
    }
  },
  set_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Sets,
      key: 'ID',
    }
  },
  card_term: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  card_definition: {
    type: DataTypes.STRING(1000),
    allowNull: false,
    
  },
  card_color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  card_text_color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


(async () => {
  try {
    await Card.sync({alter: true});
    console.log('The Card model table is synced');
  } catch (error) {
    console.log('Error: The Card model table was not synced.', error);
  }
})();

module.exports = Card;