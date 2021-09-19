const express = require('express');
const bodyParser = require('body-parser');
const db = require('./util/database');
const session = require('express-session');
const SequlizeStore = require('connect-session-sequelize')(session.Store);
const mid = require('./middleware');
require('dotenv').config();

const app = express();

//
const myStore = new SequlizeStore({
  db: db,
});

app.use(
  session({
    secret: 'process.env.SESSION_SECRET', 
    store: myStore, 
    resave: false,
    saveUninitialized: false,
    proxy: true,
  })
);

myStore.sync();

app.use((req, res, next) => {
  res.locals.currentUser = req.session.userId;
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'pug');

// Routes
const mainRoutes = require('./routes/index');
app.use('/', mainRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

//Server
(async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error(
      'Error: Could not connect to the database. Server will not start until database connection is made. ',
      error
    );
  }
})();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});
