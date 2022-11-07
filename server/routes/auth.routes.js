const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('../config');

router
  .route('/login')
  .post(
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
      try {
        console.log(req.user);
        const user = req.user;
        const payload = {
          sub: user.id,
          role: user.role,
        };
        const token = jwt.sign(payload, config.jwtSecret);
        res.json({
          user:{user,
          token}
        });
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;
