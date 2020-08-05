import express from 'express';
import Maps from '../models/tileMap';
import Users from '../models/user';
import logger from '../utils/logger';

const router = express.Router();

router.post('/reset', (req, res, next) => {
  Maps.deleteMany({})
    .then(() => {
      Users.deleteMany({})
        .then(() => res.status(204).end());
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
});

router.post('/user', (req, res, next) => {
  logger.info('creating test user', req.body);
  Users.create(req.body)
    .then(() => res.status(204).end())
    .catch((err) => {
      logger.error(err);
      next(err);
    });
});

router.post('/maps', (req, res, next) => {
  logger.info('creating test user', req.body);
  Users.findOne({ name: req.body.user.name })
    .then((user) => Maps.create({ ...req.body, user })
      .then(() => res.status(204).end()))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
});

export default router;
