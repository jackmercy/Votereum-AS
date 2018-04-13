import express from 'express';
import ContractController from '../controllers/contract.controller';

const router = express.Router();
/* Route: [/api/contract] */

router.route('/voting')
    .post(ContractController.voteForCandidates);

router.route('/votingList')
    .get(ContractController.getVotingList);

router.route('/voteResult/:id')
    .get(ContractController.getCandidateVote);

router.route('/voteStatus/:hash')
    .get(ContractController.getTransactionReceipt);

export default router;
