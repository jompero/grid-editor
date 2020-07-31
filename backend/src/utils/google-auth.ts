import { google } from 'googleapis';
import { Request, Response, NextFunction } from 'express';
import { MongooseDocument } from 'mongoose';
import Users from '../models/user';
import logger from './logger';

declare module 'express-serve-static-core' {
  export interface Request {
    user: MongooseDocument;
  }
}

function getTokenFrom(request: Request) {
  logger.info('auth request: ', request);
  const authorization = request.get('Authorization');
  logger.info('authorization header: ', authorization);
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    logger.info('Access token: ', token);
    return token;
  }
  logger.error('No access token');
  return null;
}

export function getUser(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === 'test' && req.body) {
    console.log('test user: ', req.body)
    Users.findById(req.body.user)
      .then((user) => {
        req.user = user;
        next();
      });
  } else {  
    const accessToken = getTokenFrom(req);
    if (!accessToken) {
      res.statusCode = 401;
      next(new Error('Request missing access token'));
    }

    const auth = google.oauth2({
      version: 'v2',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    auth.userinfo.get({})
      .then((response) => {
        const user = response.data;
        logger.info('user', user);

        Users.findOneAndUpdate({ profileId: user.id }, {
          name: user.name,
          email: user.email,
        }, { upsert: true, new: true })
          .then((foundUser) => {
            logger.info('passing user to req', foundUser);
            req.user = foundUser;
            next();
          });
      })
      .catch((err) => {
        res.statusCode = 401;
        next(new Error('Unauthorized request'));
      });
  }
}
