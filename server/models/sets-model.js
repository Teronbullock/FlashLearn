const { DataTypes } = require('sequelize');
const db = require('../db/database');
const Users = require('./users-model');

const Sets = db.define('fc_sets', {
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
      model: Users,
      key: 'ID',
    }
  },
  title: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    defaultValue: 'No description added'
  }
});

(async () => {
  try {
    await Sets.sync({alter: true});
    console.log('The Sets model table is synced');
  } catch (error) {
    console.log('Error: The Sets model table was not synced.', error);
  }
})();

module.exports = Sets;