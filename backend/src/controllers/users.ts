import express from 'express';
import users from '../models/user';
import { getUser } from '../utils/google-auth';
import logger from '../utils/logger';

const router = express.Router();

router.get('/', (req, res, next) => {
  users.find({})
    .then((response) => res.send(response))
    .catch((err) => {
      logger.error(err);
      next(err);
    })
});

router.post('/login', getUser, (req, res) => {
  res.send(req.user);
});

export default router;
