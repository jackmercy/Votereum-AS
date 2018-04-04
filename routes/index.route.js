var express = require('express');
var userRoutes = require('./user.route');
// import authRoutes from './auth.route';

var router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/check', (req, res) =>
  res.send('Hello hooman!')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
// router.use('/auth', authRoutes);

module.exports = router;
