import express             from 'express';
import candidateController from '../controllers/candidate.controller';

const router = express.Router();

/* Route: [/candidate] */

router.route('/list')
    .get(candidateController.getCandidateList);

router.route('/getCandidateById')
    .post(candidateController.getCandidatesById);

router.route('/create').post(candidateController.postCreateCandidate)
export default router;

