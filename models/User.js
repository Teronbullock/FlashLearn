const { Sequelize, DataTypes } = require('sequelize');
const db = require('../util/database');
const bcrypt = require('bcrypt');

const User = db.define('User', {
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true 
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
  
});

// authenticate input against database documents

User.authenticate = function(username, password, callback) {
  (async () => {
    try {
      const user = await User.findOne({ where: {username: username} }, { raw: true });

      if (!user) {
        const err = new Error('User not found');
        err.status = 401;
        callback(err);
      }

      bcrypt.compare(password, user.password, (error, result) => {
        if (result === true) {
          callback(null, user);
        } else {
          callback();
        }
      }) 

    } catch (error) {
      callback(error);
    }
  })();

};

// hash password before saving to database using Hooks
User.beforeCreate(async (user, options) => {
  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  } catch (error) {
    console.log('Error: Encryption did not work', error);
  }
  
  
});

(async () => {
  try {
    await User.sync();
    console.log("The table for the User model is synced");
  } catch (error) {
    console.log("Error: The table for the User model was not synced", error);
  }
})();

module.exports = User;