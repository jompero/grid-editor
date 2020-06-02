import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth';
import config from './config';
import Users, { User } from '../models/user';
import { Request, Response, NextFunction } from 'express';

passport.use(new GoogleStrategy.OAuth2Strategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CONSUMER_SECRET,
  callbackURL: '/callback'
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

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
      return next();
  }
  next(new Error('not authenticated'));
};

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User;

  if (Users.findOne({ profileId: user.id })) {
      next();
  } else {
      next(new Error('not authorized'));
  }
};