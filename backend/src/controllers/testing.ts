import express from 'express';
import Maps from '../models/tileMap';
import Users from '../models/user';

const router = express.Router();

router.post('/reset', (req, res) => {
  Maps.deleteMany({})
    .then(() => {
      Users.deleteMany({})
        .then(() => res.status(204).end());
    })
});

router.post('/user', (req, res) => {
  console.log('creating test user', req.body);
  Users.create(req.body)
    .then(() => res.status(204).end());
});

router.post('/maps', (req, res) => {
  console.log('creating test user', req.body);
  Users.findOne({})
    .then((user) => Maps.create({ ...req.body, user })
      .then(() => res.status(204).end()));
});

export default router;
