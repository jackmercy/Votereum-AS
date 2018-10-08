import express             from 'express';
import candidateController from '../controllers/candidate.controller';

const router = express.Router();

/* Route: [/candidate] */

router.route('/list')
    .get(candidateController.getCandidateList);

export default router;

