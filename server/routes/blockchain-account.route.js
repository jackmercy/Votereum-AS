import express             from 'express';
import BcAccountController from '../controllers/blockchain-account.controller';

var router = express.Router();

/* Route: [/blockchainAccount] */

router.route('/check').get(function(req, res) {
    res.send('blockchainAccount work');
});

router.route('/storeAccount')
    .post(BcAccountController.postStoreBlockchainAccount);

export default router;
