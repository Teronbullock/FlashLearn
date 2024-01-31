const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/database');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const methodOverride = require('method-override');
const helmet = require('helmet');
const compression = require('compression');
const serverless = require('serverless-http');

require('dotenv').config();

const app = express();
const myStore = new SequelizeStore({
  db: db,
});

app.use(helmet());
app.use(compression());
app.use(methodOverride('_method'));

// session middleware
app.use(session({
    secret: 'process.env.SESSION_SECRET', 
    store: myStore, 
    resave: true,
    saveUninitialized: false,
    proxy: true,
}));

myStore.sync();

// get current user
app.use((req, res, next) => {
  res.locals.currentUser = req.session.userID;
  next();
});



app.use(bodyParser.urlencoded({ extended: false }));



app.use('/static', express.static(__dirname + '/public'));


app.set('view engine', 'pug');


// Routes
const mainRoutes = require('./routes/main-routes');
app.use('/', mainRoutes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  console.log(err.status, err.message);

  if (!err.message) {
    res.locals.error = {
      message: 'Internal Server Error',
      status: 500,
    };
  } else {
    res.locals.error = err;
  }

  res.render('error');
});


// Export the app as a serverless function
module.exports.handler = async (event, context) => {
  // Handle database connection within the serverless function
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Error: Could not connect to the database.', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }

  // Invoke the Express.js app as usual
  return app(event, context);
};