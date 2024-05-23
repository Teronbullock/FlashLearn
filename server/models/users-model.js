const { DataTypes } = require('sequelize');
const db = require('../db/database');
const bcrypt = require('bcrypt');

const Users = db.define('fc_users', {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true 
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true
  },
  user_pass: {
    type: DataTypes.STRING,
    allowNull: false,
  }
  
});

// authenticate input against database documents
Users.authenticate = async (username, password, callback) => {
    try {
      const user = await Users.findOne({ where: {user_name: username} }, { raw: true });

      if (!user) {
        const err = new Error('User not found');
        err.status = 401;
        return callback(err);
      }
      
      console.log('Users.authenticate: ');
      bcrypt.compare(password, user.user_pass, (error, result) => {
        if (result === true) {
          callback(null, user);
        } else {
          callback();
        }
      }) 

    } catch (error) {
      console.log('Error: Users.authenticate did not work');
      callback(error);
    }
};

// compare password input to password saved in database
Users.comparePassword = async (password, hash) => {
  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (error) {
    console.log('Error: Users.comparePassword did not work');
    return false;
  }
};

// hash password before saving to database using Hooks
Users.beforeCreate( async (users, options) => {
  try {
    const hash = await bcrypt.hash(users.user_pass, 10);
    users.user_pass = hash;
    console.log('Users.beforeCreate: ');
  } catch (error) {
    console.log('Error: Encryption did not work', error);
  }
});

// hash password before saving to database using Hooks
Users.beforeUpdate( async (users, options) => {
  try {
    const hash = await bcrypt.hash(users.user_pass, 10);
    users.user_pass = hash;
    console.log('Users.beforeUpdate: ');
  } catch (error) {
    console.log('Error: Encryption did not work', error);
  }
});

(async () => {
  try {
    await Users.sync({alter: true});
    console.log("The Users model table is synced");
  } catch (error) {
    console.log("Error: The Users model table was not synced", error);
  }
})();

module.exports = Users;