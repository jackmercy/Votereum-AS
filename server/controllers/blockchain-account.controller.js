import User              from '../models/user.model';
import BlockchainAccount from '../models/blockchain-account.model';
import bcrypt            from 'bcrypt';
import ballotController from './ballot.controller';
import _ from 'lodash';
import jwt from "jsonwebtoken";

/* const variable */
const saltRounds = 10;

/** POTS: [/storeAccount]
 * req JSON {
    "address": "0xa123ksansdf",
    "citizenId": "0432",
    "password": "123456"
    }
 */
function postStoreBlockchainAccount(req, res) {
    if (!CitizenGuard(req.token)) {
        res.status(403);
        return res.json({error: true, message: 'You do not have permission to access this API'});
    }
    var _id = req.body.citizenId;
    const query = { citizenId: _id };
    var bcAccount = BlockchainAccount.countDocuments(query).exec();
    bcAccount.then(n => {
        if (_id && n === 0) {
            // user dosen't have bc account yet
            User.findOne(query, function(err, user) {
                if (err) {
                    console.log(err);
                } else if (user && user.hasBlockchainAccount === false) {
                    let newBcAccount = new BlockchainAccount();
                    bcrypt.hash(req.body.password, saltRounds, function(err, _hash) {
                        if(err) {
                            /* throw (err); */
                            console.log(err);
                        } else {
                            // Store hash in your password DB.
                            newBcAccount.address = req.body.address;
                            newBcAccount.hashPassword = _hash;
                            newBcAccount.citizenId = _id;
                            newBcAccount.save();
                            // update user
                            const updateValues = {
                                $set:
                                    { hasBlockchainAccount: true }
                            };

                            User.updateOne(
                                query,
                                updateValues,
                                { overwrite: true, upsert: false },
                                function (err, rawResponse) {}
                            );

                            var _req = _.cloneDeep(req);
                            _req.body = {
                                voterAddress: req.body.address
                            };

                            ballotController.postGiveRightToVote(_req, res);

                            /*                            // res status 200
                                                        res.json({
                                                            err: false,
                                                            message: 'successful store new blockchain account',
                                                            address: req.body.address
                                                        });*/
                        }
                    });
                } else if (user && user.hasBlockchainAccount === true) {
                    res.status(400);
                    res.json({
                        error: true,
                        message: 'Citizen have already had blockchain account'
                    });
                }
            });

        } else if (n >= 1) {
            res.status(400);
            res.json({
                error: true,
                message: 'Citizen have already had blockchain account'
            });
        } else {
            res.status(500);
            res.json({
                error: true,
                message: 'Something wrong with the server'
            });
        }
    });


}

/** POTS: [/getAddress]
 * req JSON {
    "citizenId": "0432"
    }
 */
async function postGetVoterAddress(req, res) {
    if (!CitizenGuard(req.token)) {
        res.status(403);
        return res.json({error: true, message: 'You do not have permission to access this API'});
    }

    let _citizenId = req.body.citizenId;
    let query = { citizenId: _citizenId };

    let _user = await User.findOne(query, function(err, user) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Something wrong with the server'
            });
        } else {
            _user = user;
        }
    });
    
    if (_user.hasBlockchainAccount === true ) {
        BlockchainAccount.findOne(query, function(err, bcAccount) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Something wrong with the server'
                });
            } else if (bcAccount) {
                return res.json({
                    address: bcAccount.address
                });
            }
        });
    }
}

export default {
    postStoreBlockchainAccount,
    postGetVoterAddress
}
