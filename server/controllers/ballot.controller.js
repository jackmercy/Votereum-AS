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
/*---------- Amqp Utils--------*/


/*
- GET: [/api/contract]
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
- POST: [/api/contract]
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
    handlePostRequest('postBallotInfo', res, req.body)
}

/*GET: [/api/contract/close]*/
function getCloseBallot(req, res) {
    var ballotQueue = 'ballot_queue.getCloseBallot';
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            /* when we supply queue name as an empty string,
            we create a non-durable queue with a generated name */
            ch.assertQueue('', {exclusive: true}, function(err, q) {
                var corr = generateUuid();

                console.log('[AMQP] Request: getCloseBallot');

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
                            console.log(' [AMQP] Got response: getCloseBallot');

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

/*
- GET: [/api/contract]
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
function getCandidates(req, res) {
    var ballotQueue = 'ballot_queue.getCandidates'
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            /* when we supply queue name as an empty string,
            we create a non-durable queue with a generated name */
            ch.assertQueue('', {exclusive: true}, function(err, q) {
                var corr = generateUuid();

                console.log('[AMQP] Request: getCandidates');

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
                            console.log(' [AMQP] Got response: getCandidates');

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

/*
- POST: [/api/contract/candidate]
- req.body:
{
    "candidates": [ "1000", "1002", "1003"]
}
- res:
"0xb69748c2df17e870b48366ca06942140071b5cb0d0f7757791134336dfa80716"
*/
function postCandidates(req, res) {
    var ballotQueue = 'ballot_queue.postCandidates'
    var data = req.body;
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            /* when we supply queue name as an empty string,
            we create a non-durable queue with a generated name */
            ch.assertQueue('', {exclusive: true}, function(err, q) {
                var corr = generateUuid();

                console.log('[AMQP] Request: postBallotInfo');

                //Send request
                ch.sendToQueue(
                    ballotQueue, /* queue */
                    new Buffer (JSON.stringify(data)), /* content */
                    /* option */
                    {
                        correlationId: corr, replyTo: q.queue
                    }
                );

                //Receive response
                ch.consume(q.queue, function(msg) {
                        if (msg.properties.correlationId == corr) {
                            console.log(' [AMQP] Got response: postBallotInfo');

                            var data = JSON.parse(msg.content.toString());
                            if (data['error']) {
                                res.status(500);
                            }
                            console.log(data['message']);
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
    getBallotInfo,
    postBallotInfo,
    getCloseBallot,
    getCandidates,
    postCandidates
}
