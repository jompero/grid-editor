import express from 'express';
import users from '../models/user';
import { getUser } from '../utils/google-auth';

const router = express.Router();

router.get('/', (req, res) => {
  users.find({})
    .then((response) => res.send(response));
});

router.post('/', getUser, (req, res) => {
  res.send(req.user);
});

export default router;
