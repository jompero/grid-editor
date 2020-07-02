import express from 'express';
import users from '../models/user';

const router = express.Router();

router.get('/', (req, res) => {
  users.find({})
    .then((response) => res.send(response));
});

export default router;
