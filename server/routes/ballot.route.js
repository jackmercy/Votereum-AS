import express             from 'express';
import BallotController from '../controllers/ballot.controller';

const router = express.Router();

/* Base route: [/api/ballot] */

router.route('/')
    .get(BallotController.getBallotInfo);

router.route('/')
    .post(BallotController.postBallotInfo);

router.route('/close')
    .get(BallotController.getCloseBallot);

router.route('/candidates')
    .get(BallotController.getCandidates);

router.route('/candidates')
    .post(BallotController.postCandidates);



/*

router.route('/candidate/result')
    .post(BallotController.postCandidateVoterList);

router.route('/voteForCandidates')
    .post(BallotController.postVoteForCandidates);

router.route('/test').get(BallotController.test);*/

export default router;


