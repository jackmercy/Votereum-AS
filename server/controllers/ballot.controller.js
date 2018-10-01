import amqp    from 'amqplib/callback_api';
import Web3    from 'web3';
import Ballot  from '../models/ballot.model';





/*-----------EA Section------------*/
/*
- GET: [/api/contract]
- Response:
{
    "ballotOverview" : {
        "ballotInfo": {
            "ballotName": "President Election",
            "isFinalized": false,
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
}*/
function getBallotInfo(req, res) {
    if (!EaGuard(req.token)) {
        return res.status(403).json({error: true, message: 'You do not have permission to access this API'});
    }
    handleGetRequest('getBallotInfo', res);
}


/*
- POST: [/api/ballot]
- req.body:
Condition: startRegPhase < endRegPhase < startVotingPhase < endVotingPhase
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
            handlePostRequest('postBallotInfo', res, req.body);
            ballotInfo.save();
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
- GET: [/api/ballot/candidate]
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
    handleGetRequest('getCandidates', res);
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

                            var data = JSON.parse(msg.content.toString());
                            if (data['error']) {
                                res.status(500);
                            }
                            res.json(data['message']);

                            conn.close();
                        }
                    },
                    { noAck: true }
                );
            });npm
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
                                res.status(500);
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

    postCandidateResult
}
