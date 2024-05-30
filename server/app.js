import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import pgHstore from 'pg-hstore';
import db from './db/database.js';
import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';
import methodOverride from 'method-override';
import helmet from 'helmet';
import compression from 'compression';
// import { dirname } from 'path';
import dotenv from 'dotenv';


const SequelizeStore = connectSessionSequelize(session.Store);
// const __dirname = dirname();

// Load environment variables
dotenv.config();

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

// app.use('/static', express.static(__dirname + '/public'));

// app.set('view engine', 'pug');

// Routes
import mainRoutes from './routes/main-routes.js';
import { col } from 'sequelize';
app.use('/', mainRoutes);

// disable favicon requests
app.use('/favicon.ico', (req, res, next) => {
  // Return a 204 No Content response
  res.status(204).end();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found ');
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
  console.log(`Express app listening on http://localhost:${port}`);
});
