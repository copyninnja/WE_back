import dotenv from 'dotenv';
import express from 'express';

import bodyParser from 'body-parser';
import './db.js';
// import {loadUsers} from './seedData';
import usersRouter from './api/users/index.js';
import session from 'express-session';
import passport from './authenticate/index.js';
import errorhandler  from 'errorhandler';
import notifier  from 'node-notifier';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import chatRouter from './api/chat'
dotenv.config();

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    app.use(errorhandler({ log: errorNotification }))

    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};

const errorNotification= (err, str, req)=> {
  var title = 'Error in ' + req.method + ' ' + req.url

  notifier.notify({
    title: title,
    message: str
  })
}


// if (process.env.SEED_DB) {
//   loadUsers();
// }

const app = express();

//new
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/api/users', usersRouter);
app.use('/api/msglist', chatRouter);


app.use(errHandler);

// Add passport.authenticate(..)  to middleware stack for protected routes​
// app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
module.exports = app;


