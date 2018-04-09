import express from 'express';
import ContractController from '../controllers/contract.controller';

const router = express.Router();

router.route('/voting')
    .get(ContractController.voteforCandidate);

router.route('/votingList')
    .get(ContractController.getVotingList);

router.route('/vote/:name')
    .get(ContractController.getCandidateVote);

export default router;
