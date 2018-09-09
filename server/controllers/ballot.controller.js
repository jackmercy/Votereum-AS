import amqp    from 'amqplib/callback_api';
import Web3    from 'web3';


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


/*-----------EA Section------------*/
/*
- GET: [/api/ballot]
- Response:
{
    "ballotName": "President Election",
    "startRegPhase": "1543050000",
    "endRegPhase": "1543080000",
    "startVotingPhase": "1540370700",
    "endVotingPhase": "1543049100",
    "isFinalized": false,
    "registeredVoterCount": "0",
    "votedVoterCount": "0"
}
*/
function getBallotInfo(req, res) {
    handleGetRequest('getBallotInfo', res);
}


/*
- POST: [/api/ballot]
- req.body:
Condition: startRegPhase < endRegPhase < startVotingPhase < endVotingPhase
{
    "ballotName": "President Election",
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
    handlePostRequest('postBallotInfo', res, req.body);
}


/* - POST: [/api/ballot/close]*/
function postCloseBallot(req, res) {
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
    handlePostRequest('postHasRightToVote', res, req.body);
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

    postCandidateResult
}
