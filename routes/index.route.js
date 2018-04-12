import express from 'express';
import userRoutes from './user.route';
import candidateRoutes from './candidate.route';
import contractRoutes from './contract.route';
// import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/* Base route: [/api] */

/** GET [/health-check]
*  - Check service health */
router.get('/check', (req, res) =>
  res.send('Hello hooman!')
);

router.use('/user', userRoutes);
router.use('/candidate', candidateRoutes);
router.use('/contract', contractRoutes);

export default router;
