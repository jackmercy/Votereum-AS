import express             from 'express';
import BallotController from '../controllers/ballot.controller';

const router = express.Router();

/* Base route: [/api/ballot] */

/*------------------EA-----------------*/
router.route('/')
    .get(BallotController.getBallotInfo);

router.route('/')
    .post(BallotController.postBallotInfo);

router.route('/close')
    .post(BallotController.postCloseBallot);

router.route('/finalize')
    .post(BallotController.postFinalizeBallot);

router.route('/finalize')
    .get(BallotController.getIsFinalized);

router.route('/candidate')
    .post(BallotController.postCandidates);

router.route('/giveRight')
    .post(BallotController.postGiveRightToVote);

router.route('/hasRight')
    .post(BallotController.postHasRightToVote);

router.route('/resetTime')
    .post(BallotController.postResetTime);

router.route('/claimStoredAmount')
    .post(BallotController.postClaimStoredAmount);

/*------------------Voter-----------------*/
router.route('/vote')
    .post(BallotController.postVoteForCandidates);

/*-----------------Public----------------------*/
router.route('/result')
    .post(BallotController.postCandidateResult);

router.route('/selected-candidates')
    .get(BallotController.getCandidates);



/*router.route('/voteForCandidates')
    .post(BallotController.postVoteForCandidates);*/

/*router.route('/test').get(BallotController.test);*/

export default router;


