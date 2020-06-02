import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.profile' }), function (req, res, next) {
  res.send('respond with a resource');
});

export default router;
