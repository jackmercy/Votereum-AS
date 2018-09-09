import express from 'express';
import EAController from '../controllers/election-admin.controller';

const router = express.Router();
/* Route: [/ea] */

router.route('/list')
    .get(EAController.getCandidateList);

export default router;