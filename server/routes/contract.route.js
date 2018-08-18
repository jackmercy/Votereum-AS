import express            from 'express';
import ContractController from '../controllers/contract.controller';

const router = express.Router();
/* Route: [/api/contract] */

router.route('/isAccountUnlocked')
    .get(ContractController.isAccountUnlocked);

router.route('/createCandidateList')
    .post(ContractController.createCandidateList);

router.route('/voting')
    .post(ContractController.voteForCandidates);

router.route('/votingList')
    .get(ContractController.getVotingList);

router.route('/voteResult/:id')
    .get(ContractController.getCandidateVote);

router.route('/voteStatus')
    .post(ContractController.getTransactionReceipt);

router.route('/getBlock')
    .post(ContractController.getBlock);
export default router;
