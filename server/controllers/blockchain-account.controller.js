import User              from '../models/user.model';
import BlockchainAccount from '../models/blockchain-account.model';
import bcrypt            from 'bcrypt';
import ballotController from './ballot.controller';
import _ from 'lodash';
import jwt from "jsonwebtoken";
import amqp from "amqplib/callback_api";

/* const variable */
const saltRounds = 10;

/** POTS: [/storeAccount]
 * req JSON {
    "address": "0xa123ksansdf",
    "citizenId": "0432",
    "password": "123456"
    }
 req JSON {
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
    var query = { citizenId: _id };
    var bcAccount = BlockchainAccount.countDocuments(query).exec();
    bcAccount.then(n => {
        if (_id && n === 0) {
            // user dosen't have bc account yet
            User.findOne(query, function(err, user) {
                if (err) {
                    console.log(err);
                }

                if (user && user.hasBlockchainAccount === false) {
                    let newBcAccount = new BlockchainAccount();
                    bcrypt.compare(req.body.password, user.hashPassword, function(err, _result) {
                        if (err) {
                            res.status(500).json({
                                error: true,
                                message: 'Internal server error'
                            });
                        } else if (_result) {
                            bcrypt.hash(req.body.password, saltRounds, function(err, _hash) {
                                if(err) {
                                    /* throw (err); */
                                    console.log(err);
                                } else { // Create new account
    
                                    const method = 'postStoreBlockchainAccount';
                                    const data = req.body;
    
                                    // Communicate with OBR
                                    var ballotQueue = 'ballot_queue.' + method;
                                    amqp.connect('amqp://localhost', function(err, conn) {
                                        conn.createChannel(function(err, ch) {
                                            /* when we supply queue name as an empty string,
                                            we create a non-durable queue with a generated name */
                                            ch.assertQueue('', {exclusive: true}, function(err, q) {
                                                var corr = generateUuid();
    
                                                console.log('[AMQP] Request: ' + method);
    
                                                ch.sendToQueue(
                                                    ballotQueue, /* queue */
                                                    new Buffer (JSON.stringify(data)), /* content */
                                                    /* option */
                                                    {
                                                        correlationId: corr, replyTo: q.queue
                                                    }
                                                );
    
                                                ch.consume(
                                                    q.queue,
                                                    function(msg) {
                                                        if (msg.properties.correlationId == corr) {
                                                            console.log(' [AMQP] Got response: ' + method);
    
                                                            //Res: { "address": "0x302498cdaf4c"}
                                                            var data = JSON.parse(msg.content.toString());
                                                            if (data['error']) {
                                                                res.status(500).json(data['message']);
    
                                                                return conn.close();
                                                            }
                                                            /**Handle received data*/
    
                                                            // Store hash in your password DB.
                                                            newBcAccount.address = data['message']['address'];
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
                                                                voterAddress: data['message']['address']
                                                            };
    
                                                            ballotController.postGiveRightToVote(_req, res);
    
                                                            /*// res status 200
                                                            res.json({
                                                                err: false,
                                                                message: 'successful store new blockchain account',
                                                                address: req.body.address
                                                            });*/
    
                                                            conn.close();
                                                        }
                                                    },
                                                    { noAck: true }
                                                );
                                            });
                                        });
                                    });
    
                                }
                            });
                        } else {
                            res.status(400);
                            return res.json({
                                error: true,
                                message: 'Invalid password'
                            });
                        }
                        
                    });
                }

                if (user && user.hasBlockchainAccount === true) {
                    res.status(400);
                    res.json({
                        error: true,
                        message: 'Citizen have already had blockchain account'
                    });
                }
            });

        }

        if (n >= 1) {
            res.status(400);
            res.json({
                error: true,
                message: 'Citizen have already had blockchain account'
            });
        }

    })
    .catch(error => {
        res.status(500);
        res.json({
            error: true,
            message: 'Something wrong with the server'
        });
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
    } else {
        return res.json({
            address: 'None'
        });
    }
}

function handlePostRequest(method, res, data) {
    var ballotQueue = 'ballot_queue.' + method;
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            /* when we supply queue name as an empty string,
            we create a non-durable queue with a generated name */
            ch.assertQueue('', {exclusive: true}, function(err, q) {
                var corr = generateUuid();

                console.log('[AMQP] Request: ' + method);

                ch.sendToQueue(
                    ballotQueue, /* queue */
                    new Buffer (JSON.stringify(data)), /* content */
                    /* option */
                    {
                        correlationId: corr, replyTo: q.queue
                    }
                );

                ch.consume(q.queue, function(msg) {
                        if (msg.properties.correlationId == corr) {
                            console.log(' [AMQP] Got response: ' + method);

                            var data = JSON.parse(msg.content.toString());
                            if (data['error']) {
                                res.status(500).json(data['message']);

                                return conn.close();
                            }
                            res.json(data['message']);

                            conn.close();
                        }
                    },
                    { noAck: true }
                );
            });
        });
    });
}

export default {
    postStoreBlockchainAccount,
    postGetVoterAddress
}
