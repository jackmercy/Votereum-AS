import express from 'express';
import userRoutes from './user.route';
import candidateRoutes from './candidate.route';
import contractRoutes from './contract.route';
// import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/check', (req, res) =>
  res.send('Hello hooman!')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount candidate routes at /candidates
router.use('/candidates', candidateRoutes);
router.use('/contract', contractRoutes);
// mount auth routes at /auth
// router.use('/auth', authRoutes);

export default router;
