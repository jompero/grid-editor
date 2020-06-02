import config from './utils/config';
import express from 'express';
import path from 'path';
// import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';

import GoogleStrategy from 'passport-google-oauth';
import Users, { User } from './models/user';

//import * as auth from './utils/passport';

import loginRouter from './controllers/login';
import indexRouter from './controllers/index';
import usersRouter from './controllers/users';
import mapsRouter from './controllers/maps';
import logger from './utils/logger';



logger.info('connecting to MongoDB:', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  });

console.log('configuring passport', 'clientId', config.GOOGLE_CLIENT_ID, 'consumer secret', config.GOOGLE_CONSUMER_SECRET);
passport.use(new GoogleStrategy.OAuth2Strategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CONSUMER_SECRET,
  callbackURL: '/api/login/callback'
},
  function (token, tokenSecret, profile, done) {
    Users.findByIdAndUpdate(
      { googleId: profile.id },
      { name: profile.displayName, profileId: profile.id },
      { upsert: true },
      function (err, user) {
        return done(err, user);
      });
  }
));

const app = express();

// TODO: Make sure to use the 'proper' logger and create a page to inspect it
// app.use(logger('dev'));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const publicFolder = path.join(__dirname, 'public');
console.log('loading static content from', publicFolder);
app.use(express.static(publicFolder));

app.use('/api/login/', loginRouter);
app.use('/api/', indexRouter);
app.use('/api/users/', usersRouter);
app.use('/api/maps/', mapsRouter);

module.exports = app;
