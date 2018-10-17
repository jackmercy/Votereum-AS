import amqp    from 'amqplib/callback_api';
import Web3    from 'web3';
import bcrypt  from "bcrypt";
import Ballot  from '../models/ballot.model';
import * as _  from 'lodash';
import Candidate         from '../models/candidate.model';
import User              from '../models/user.model';
import BlockchainAccount from "../models/blockchain-account.model";







/*-----------EA Section------------*/



/*
- POST: [/api/ballot]
- req.body:
Condition: now < startRegPhase < endRegPhase < startVotingPhase < endVotingPhase
{
    "ballotName": "President Election",
    "fundAmount": 1000000,
    "maxCandidate": 3,
    "startRegPhase": "1540370700",
    "endRegPhase": "1543049100",
    "startVotingPhase": "1543050000",
    "endVotingPhase": "1543080000",
    "candidateIDs": [
        "1",
        "2",
        "3",
        "4"
    ]
}
- res:
"0xb69748c2df17e870b48366ca06942140071b5cb0d0f7757791134336dfa80716"
*/
function postBallotInfo(req, res) {
    if (!EaGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }
    const ballotInfo = new Ballot(req.body);
    let query = { ballotName: req.body.ballotName };
    Ballot.find(query, function(err, ballot) {
        if (err || ballot.length > 0) {
            console.log(err);
            res.status(400).json({
                message: 'Duplicate ballot'
            });
        } else if(ballot.length === 0) {
            /* check condition */
            const nowTs = global.GetTimestampNowInSeconds();
            const startRegPhase = req.body.startRegPhase;
            const endRegPhase = req.body.endRegPhase;
            const startVotingPhase = req.body.startVotingPhase;
            const endVotingPhase = req.body.endVotingPhase;
            /* ballot.currentBallot = true; */

            if (nowTs <= startRegPhase
                && startRegPhase <= endRegPhase
                && endRegPhase <= startVotingPhase
                && startVotingPhase <= endVotingPhase) {
                    handlePostRequest('postBallotInfo', res, req.body);
                    let _updateValue = { $set: { currentBallot: false }};
                    Ballot.updateMany({}, _updateValue, { overwrite: true, upsert: false }, function(err) {
                        if (err) {
                            console.log(err);
                            res.status(500).json({
                                message: 'Some thing wrong with the db'
                            });
                        } else {
                            ballotInfo.currentBallot = true;
                            ballotInfo.save();
                        }
                    });
            } else {
                return res.status(400).json({
                    message: 'Phase timestamp is not valid'
                });
            }
        }

    });

}


/* - POST: [/api/ballot/close]
- req.body:
Condition: startRegPhase < endRegPhase < startVotingPhase < endVotingPhase
{
    "phrase": "close"
}
- res:
"0xb69748c2df17e870b48366ca06942140071b5cb0d0f7757791134336dfa80716"
 */
function postCloseBallot(req, res) {
    if (!EaGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }
    handlePostRequest('postCloseBallot', res, req.body);
}

/*
- POST: [/api/ballot/candidate]
- req.body:
{
    "candidates": [ "1000", "1002", "1003"]
}
- res:
"0xb69748c2df17e870b48366ca06942140071b5cb0d0f7757791134336dfa80716"
*/
function postCandidates(req, res) {
    if (!EaGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }
    handlePostRequest('postCandidates', res, req.body);
}


/*
- GET: [/api/ballot/finalize]
- Response:
{
    "isFinalized": true
}
*/
function getIsFinalized(req, res) {
    if (!EaGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }
    handleGetRequest('getIsFinalized', res);
}

/** 
 * GET: [/api/get-ballot-phases]
 */
function getBallotPhases(req, res) {
    if (!EaGuard(req.token) && !CitizenGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }
    handleGetRequest('getBallotPhases', res);
}

/** 
 * GET: [/api/get-display-phases] 
 */
function getDisplayPhases(req, res) {
    if (!EaGuard(req.token) && !CitizenGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }

    let query = { currentBallot: true };
    Ballot.findOne(query, function(err, _ballot) {
        if (err) {
            console.log(err);
            res.status(500);
        } else if (_ballot) {
            const phaseInfo = {
                startRegPhase: _ballot.startRegPhase,
                endRegPhase: _ballot.endRegPhase,
                startVotingPhase: _ballot.startVotingPhase,
                endVotingPhase: _ballot.endVotingPhase
            };

            return res.json(phaseInfo);
        }
    }) 
}
/*
- POST: [/api/ballot/finalize]
- req.body:
{
    "phrase": "finalize"
}
- Response:
{
    "0xb69748c2df17e870b48366ca06942140071b5cb0d0f7757791134336dfa80716"
}
*/
function postFinalizeBallot(req, res) {
    if (!EaGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }
    handlePostRequest('postFinalizeBallot', res, req.body);
}


/*
- POST: [/api/ballot/giveRight]
- req.body:
{
    "voterAddress": "0x11a4c82c1e5CBE015c6d09df2F30fD1668a5E410"
}
- Response:
{
    "0xb69748c2df17e870b48366ca06942140071b5cb0d0f7757791134336dfa80716"
}
*/
function postGiveRightToVote(req, res) {
    if (!CitizenGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }
    /* check if in reg phase or not */
    handlePostRequest('postGiveRightToVote', res, req.body);
}

/*
- POST: [/api/ballot/hasRight]
- req.body:
{
    "voterAddress": "0x11a4c82c1e5CBE015c6d09df2F30fD1668a5E410"
}
- Response:
{
    "hasRight": true
}
*/
function postHasRightToVote(req, res) {
    if (!CitizenGuard(req.token)  && !EaGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }
    handlePostRequest('postHasRightToVote', res, req.body);
}


/*
- GET: [/api/ballot/voterAddressList]
- Response:
{
    "voterAddressList": [
        "0x11a4c82c1e5CBE015c6d09df2F30fD1668a5E410",
        "0x11a4c82c1e5CBE015c6d09df2F30fD1668a5E410"
        "0x11a4c82c1e5CBE015c6d09df2F30fD1668a5E410"
    ]
}
*/
function getVoterAddressList(req, res) {
    if (!EaGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }
    handleGetRequest('getVoterAddressList', res);

}

/*
- POST: [/api/ballot/resetTime]
- req.body:
{
    "phrase": "startRegPhase"
}
- res:
"0xb69748c2df17e870b48366ca06942140071b5cb0d0f7757791134336dfa80716"
*/
function postResetTime(req, res) {
    if (!EaGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }
    handlePostRequest('postResetTime', res, req.body);
}

/*
- POST: [/api/ballot/claimStoredAmount]
- req.body:
{
    "phrase": "claim"
}
- res:
"0xb69748c2df17e870b48366ca06942140071b5cb0d0f7757791134336dfa80716"
*/
function postClaimStoredAmount(req, res) {
    if (!EaGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }
    handlePostRequest('postClaimStoredAmount', res, req.body);
}


/*-----------End EA Section------------*/

/*-----------Voter Section------------*/
/*
- POST: [/api/ballot/vote]
- req.body:
{
    "citizenIds": "2321"
    "chainPassword": "123465"
    "candidateIds": [
        "1145",
        "0327",
        "7272"
    ]
}
- res:
"0xb69748c2df17e870b48366ca06942140071b5cb0d0f7757791134336dfa80716"
*/
function postVoteForCandidates(req, res) {
    // Check access role
    if (!CitizenGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }

    // Check field
    if(!req.body['chainPassword']) {
        return res.status(400).json({
            error: true,
            message: 'Password is required'
        });
    } else if(!req.body.citizenId) {
        return res.status(400).json({
            error: true,
            message: 'Citizen ID is required'
        });
    }
    const query = {citizenId: req.body.citizenId};
    // Check valid password
    BlockchainAccount.findOne(query, function(err, account) {
        if(err) {
            console.log('ERR');
        } else if(account) {
            // problem: reveal user password
            bcrypt.compare(req.body['chainPassword'], account.hashPassword, function(err, _result) {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        message: 'Wrong password'
                    });
                }

                // Add voter's address to req.body
                if (_result) {
                    req.body['address'] = account['address'];
                    /* Handle request */
                    let method = 'postVoteForCandidates';
                    let ballotQueue = 'ballot_queue.' + method;
                    amqp.connect('amqp://localhost', function(err, conn) {
                        conn.createChannel(function(err, ch) {
                            /* when we supply queue name as an empty string,
                            we create a non-durable queue with a generated name */
                            ch.assertQueue('', {exclusive: true}, function(err, q) {
                                var corr = generateUuid();

                                console.log('[AMQP] Request: ' + method);

                                ch.sendToQueue(
                                    ballotQueue, /* queue */
                                    new Buffer (''), /* content */
                                    /* option */
                                    {
                                        correlationId: corr, replyTo: q.queue
                                    }
                                );

                                ch.consume(q.queue, function(msg) {
                                        if (msg.properties.correlationId == corr) {
                                            console.log(' [AMQP] Got response: ' + method);

                                            // Handle returned data
                                            var data = JSON.parse(msg.content.toString());
                                            if (data['error']) {
                                                res.status(500);

                                                return conn.close();
                                            }
                                            /* get data */
                                            let txHash = data['message'];
                                            // update user
                                            let updateValues = {
                                                $set: { 
                                                    hash: txHash,
                                                    isVote: true
                                                }
                                            };
                                            User.updateOne(
                                                query,
                                                updateValues,
                                                { overwrite: true, upsert: false },
                                                function (err, rawResponse) {}
                                            );
                                            //-------------------------
                                            res.json({
                                                hash: txHash
                                            });
                                            return conn.close();
                                        }
                                    },
                                    { noAck: true }
                                );
                            });
                        });
                    });
                    /* Handle request */
                   
                } else {
                    res.status(400);
                    return res.json({
                        error: true,
                        message: 'Invalid password'
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

/*-----------End Voter Section------------*/


/*-----------Public Section---------------*/
/*
- POST: [/api/ballot/candidate/result]
- req.body:
{
    "candidateID": "1001"
}
- Response:
{
    "voteCount": 12,
    "whoVoted": [
        "0x11a4c82c1e5CBE015c6d09df2F30fD1668a5E410",
        "0x6123cFfB3dDDfEA5e4445e1C1b5D53f0F502725C"
    ]
}
*/
function postCandidateResult(req, res) {
    if (!CitizenGuard(req.token) && !EaGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }
    handlePostRequest('postCandidateResult', res, req.body)
}


/*
- GET: [/api/ballot/selected-candidates]
- Response:
{
    "candidateIds": [
        "1",
        "2",
        "3",
        "4"
    ]
}
*/
function getCandidates(req, res) {
    /* handleGetRequest('getCandidates', res); */
    const method = 'getCandidates';
    const ballotQueue = 'ballot_queue.' + method;
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.assertQueue('', {exclusive: true}, function(err, q) {
                var corr = generateUuid();
                console.log('[AMQP] Request: ' + method);

                ch.sendToQueue(
                    ballotQueue, 
                    new Buffer (''),
                    {
                        correlationId: corr, replyTo: q.queue
                    }
                );

                ch.consume(q.queue, function(msg) {
                        if (msg.properties.correlationId == corr) {
                            console.log(' [AMQP] Got response: ' + method);

                            // Handle returned data
                            var data = JSON.parse(msg.content.toString());
                            if (data['error']) {
                                res.status(500);
                                return conn.close();
                            }
                            let candidateIds = data['message']["candidateIds"];
                            let query = { id: { $in: candidateIds}};
                            console.log(candidateIds);
                            Candidate.find(query, function(err, candidates) {

                                if(err) {
                                    console.log('ERR');
                                } else if(candidates.length > 0) {
                                    res.status(200).json(candidates);
                                } else {
                                    const message = {
                                        message: 'No candidate is found'
                                    }
                                    res.json(message);
                                }
                            });
                            //-------------------------
                            conn.close();
                        }
                    },
                    { noAck: true }
                );
            });
        });
    });
}

/*
- GET: [/api/contract]
- Response:
- For EA
{
    "ballotInfo": {
        "ballotName": "President Election",
        "isFinalized": false,
        "limitCandidate": 3,
        "amount": 6000000000,
        "storedAmount": 60000000000
    },
    "phaseInfo": {
        "startRegPhase": "1543050000",
        "endRegPhase": "1543080000",
        "startVotingPhase": "1540370700",
        "endVotingPhase": "1543049100",
    },
    "voterInfo": {
         "registeredVoterCount": "0",
         "votedVoterCount": "0",
         "fundedVoterCount": "0",
    }

}

- For Public:
{

}
*/
function getBallotInfo(req, res) {
    if (!EaGuard(req.token) && !CitizenGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }
    var method = 'getBallotInfo';
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
                    new Buffer (''), /* content */
                    /* option */
                    {
                        correlationId: corr, replyTo: q.queue
                    }
                );

                ch.consume(q.queue, function(msg) {
                        if (msg.properties.correlationId == corr) {
                            console.log(' [AMQP] Got response: ' + method);

                            // Handle returned data
                            var data = JSON.parse(msg.content.toString());
                            if (data['error']) {
                                res.status(500);
                            }

                            if (EaGuard(req.token)) { res.json(data['message']); }
                            if (CitizenGuard(req.token)) {
                                const payload = {
                                    ballotInfo: _.pick(data['message']['ballotInfo'], ['ballotName', 'limitCandidate']),
                                    phaseInfo: data['message']['phaseInfo']
                                };
                                res.json(payload);
                            }

                            //-------------------------

                            conn.close();
                        }
                    },
                    { noAck: true }
                );
            });
        });
    });
}

/*---------- Amqp Utils--------*/
//method = method name
function handleGetRequest(method, res) {
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
                    new Buffer (''), /* content */
                    /* option */
                    {
                        correlationId: corr, replyTo: q.queue
                    }
                );

                ch.consume(q.queue, function(msg) {
                        if (msg.properties.correlationId == corr) {
                            console.log(' [AMQP] Got response: ' + method);

                            // Handle returned data
                            var data = JSON.parse(msg.content.toString());
                            if (data['error']) {
                                res.status(500);

                                return conn.close();
                            }
                            res.json(data['message']);
                            //-------------------------

                            conn.close();
                        }
                    },
                    { noAck: true }
                );
            });
        });
    });
}

//data = req.body
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
/*---------- End Amqp Utils--------*/

export default {
    getDisplayPhases,
    getBallotPhases,
    getBallotInfo,
    postBallotInfo,
    postCloseBallot,
    postFinalizeBallot,
    getIsFinalized,
    getCandidates,
    postCandidates,
    postGiveRightToVote,
    postHasRightToVote,
    postResetTime,
    postClaimStoredAmount,
    postVoteForCandidates,

    postCandidateResult
}
