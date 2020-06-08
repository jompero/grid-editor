import { google } from 'googleapis';
import config from './config';
import { Request, Response, NextFunction } from 'express';
import Users, { User } from '../models/user';
import { MongooseDocument } from 'mongoose';

const googleConfig = {
  clientId: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CONSUMER_SECRET,
  redirect: 'https://your-website.com/google-auth'
};

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.email',
];

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

//function getConnectionUrl(auth) {
//  return auth.generateAuthUrl({
//    access_type: 'offline',
//    prompt: 'consent',
//    scope: defaultScope
//  });
//}
//
//function googleUrl() {
//  const auth = createConnection();
//  const url = getConnectionUrl(auth);
//  return url;
//}

declare module "express-serve-static-core" {
  export interface Request {
    user: MongooseDocument;
  }
}

export function getUser(req: Request, res: Response, next: NextFunction) {
  const accessToken = getTokenFrom(req);
  const auth = google.oauth2({
    version: 'v2',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  auth.userinfo.get({})
    .then(response => {
      const user = response.data;
      console.log('user', user);

      Users.findOneAndUpdate({ profileId: user.id }, {
        name: user.name,
        email: user.email
      }, { upsert: true, new: true })
        .then((user) => {
          console.log('passing user to req', user)
          req.user = user;
          next();
        });
    });
}

function getTokenFrom(request: Request) {
  //console.log('request', request);
  const authorization = request.get('Authorization')
  //console.log('auth', authorization);
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    console.log('Access token', token);
    return token;
  }
  console.log('No access token');
  return null
}