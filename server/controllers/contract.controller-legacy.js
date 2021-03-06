import express from 'express';
import User    from '../models/user.model';
import Web3    from 'web3';
import amqp    from 'amqplib/callback_api';
/* TODO: add citizen_id on vote => send token, AS check token -> citizen_id */

// contractInstance.updateCandidateList(candidateList);
/* POST: [/createCandidateList]
    req JSON {
        "candidateIDs": ["id1", "id2"],
        "citizenID": "333"
    }
    For admin only
*/
var candidateList = ['5ad9535a561dfd00d0bb1e72',
                    '5ad9535a561dfd00d0bb1e73',
                    '5ad9535a561dfd00d0bb1e74',
                    '5ad9535a561dfd00d0bb1e75',
                    '5ad9535a561dfd00d0bb1e76',
                    '5ad9535a561dfd00d0bb1e77'];
/* Note: web3.eth.estimateGas
    Executes a message call or transaction, which is directly executed in the VM of the node,
    but never mined into the blockchain and returns the amount of the gas used. */
function createCandidateList(req, res) {
    User.findOne({id: req.body.citizenID}, function(err, _user) {
        if(err) {
            console.log('ERR');
        } else if(_user && _user.role === 'citizen') {
            const message = {
                message: 'Request is rejected'
            }
            res.json(message);
        } else if(_user && _user.role === 'admin') {
            var Txhash;
            /* Handle contract call */
            if (contractInstance) {
                var list = req.body.candidateIDs;
                Txhash = contractInstance.updateCandidateList(list, {from: web3.eth.accounts[0], gas: 100000});

                if (Txhash) {
                    candidateList = list;
                    const res_msg = {
                        hash: Txhash,
                        candidateIDs: candidateList
                    }
                    User.getUserByID
                    res.json(res_msg);
                }
            }
            /* Update user information */
            var user = new User(_user);
            user.isVote = true;
            user.hash = Txhash;
            user.save();
        } else {
            const message = {
                message: 'Invalid citizen ID'
            }
            res.json(message);
        }
    });
}

// NOTE: to get param value in /vote/:id use req.params.id

/* POST: [/voting] */
/* request JSON {
    "candidates": ["id1","id2", "id-N"],
    "citizenID": "0423"
} */



function isAccountUnlocked(req, res) {
    /* var voterAddress;
    //var privateKey = '9f151ccd60bdfd3b729cb0e264e3590f52e7a2064e67d8a3e655c65ba294065d';
    web3.eth.getAccounts().then(accounts => {
        voterAddress = accounts[0];
        web3.eth.personal.unlockAccount(voterAddress, "", 60000000)
            .then((response) => {
                console.log(response);
                return res.send(true);
            }).catch((error) => {
            console.log(error);
            return res.send(false);
        });
    }); */
    var voterAddress = '0x8836D199c0aB6dc64101127a4B15f756F815914c';

    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            /* when we supply queue name as an empty string,
            we create a non-durable queue with a generated name */
            ch.assertQueue('', {exclusive: true}, function(err, q) {
                var corr = generateUuid();
                var voterObj = {
                    address: voterAddress
                }
                console.log('[AMQP] Request: isAccountUnlocked'); 

                ch.sendToQueue(
                    'citizen_queue', /* queue */
                    new Buffer(JSON.stringify(voterObj)), /* content */
                    /* option */
                    {
                        correlationId: corr, replyTo: q.queue
                    } 
                );

                ch.consume(q.queue, function(msg) {
                        if (msg.properties.correlationId == corr) {
                            console.log(' [AMQP] Got response: isAccountUnlocked');
                            res.send(msg.content.toString());
                            /* setTimeout(function() {
                                conn.close(); 
                            }, 1000); */
                            conn.close(); 
                        }
                    }, 
                    { noAck: true }
                );
            });
        });
    });
}

function voteForCandidates(req, res) {
    var candids = ['Candid1', 'Candid2'];
    var voterAddress;
    var newArray =  candids.map(value => web3.utils.fromAscii(value));
    var privateKey = '0xdb858c9df8501f7b79436b9a4d90a0cf3a3ef724e8137e79aafdbc3452166b3e';

    voterAddress = '0x6123cFfB3dDDfEA5e4445e1C1b5D53f0F502725C';
    var txtString = votingContract.methods.voteForCandidates(newArray).encodeABI();


    web3.eth.estimateGas({
        to: '0x6123cFfB3dDDfEA5e4445e1C1b5D53f0F502725C',
        data: txtString
    }).then(function (value) {
        console.log(value);
        var txtObject = {
            to: '0xbdca24b079e714146fe40764c2d9b9f7995afc2a',
            gas: (value+20000).toString(16),
            data: txtString
        };



        web3.eth.accounts.signTransaction(txtObject, privateKey).then(function (object) {

            web3.eth.sendSignedTransaction(object['rawTransaction']).on('receipt', function (receipt) {
                //console.log(receipt);
            });
        });
    });


/*    votingContract.methods.voteForCandidates(newArray).send({
        from: voterAddress,
        gas: 600000
    }).then(function(transactionHash) {
        console.log(transactionHash);
    }).catch(function (error) {
        console.log(error);
    });*/

}

/*function voteForCandidates(req, res) {
    User.findOne({id: req.body.citizenID}, function(err, _user) {
        if(err) {
            console.log('ERR');
        } else if(_user && _user.isVote === false && _user.role === 'citizen') {
            var Txhash;
            /!* Handle contract call *!/
            if (contractInstance && isAccountUnlocked()) {
                Txhash = contractInstance.voteForCandidates(req.body.candidates, {from: web3.eth.accounts[0], gas: 100000});
                if(Txhash) {
                    const res_msg = {
                        hash: Txhash,
                        isVote: true
                    }
                    console.log(Txhash);
                    res.json(res_msg);
                }
            }
            /!* Update user information *!/
            var user = new User(_user);
            // dev -> always false.
            user.isVote = true;
            user.hash = Txhash;
            user.save();
        } else if(_user && _user.isVote === true && _user.role === 'citizen') {
            const message = {
                message: 'Citizen has already voted. Request is rejected'
            }
            res.json(message);
        } else if(_user && _user.role === 'admin') {
            const message = {
                message: 'Admin is not allowed to vote. Request is rejected'
            }
            res.json(message);
        } else {
            const message = {
                message: 'Invalid citizen ID'
            }
            res.json(message);
        }
    });
}*/

/* GET: [/votingList]
    Public API
*/
function getVotingList(req, res) {
    if (contractInstance) {
        const res_msg = {};
        for (var index in candidateList) {
            var voteRecieved = contractInstance.totalVotesFor.call(candidateList[index]);
            res_msg[candidateList[index]] = voteRecieved;
        }
        res.json(res_msg);
    }
}

/* GET: [/voteResult/:id]
    Public API
*/
function getCandidateVote(req, res) {
    let candidateId = req.params.id;
    var voteRecieved = contractInstance.totalVotesFor.call(candidateId);
    const res_msg = {};
    res_msg[candidateId] = voteRecieved;
    res.json(res_msg);
}

/* POST: [/voteStatus]
    res JSON {
        "hash": "0x1324143"
    }
    Public API????
*/
function getTransactionReceipt(req, res) {
    let receipt = web3.eth.getTransactionReceipt(req.body.hash);
    res.json(receipt);
}

/* POST: [/getBlock]
    res JSON {
        "block": "0x1324143"
    }
    block can be block number or block hash
*/
function getBlock(req, res) {
    let block = web3.eth.getBlock(req.body.block, {from: web3.eth.accounts[0], gas: 10000});
    res.json(block);
}

export default {
    createCandidateList,
    voteForCandidates,
    getVotingList,
    getCandidateVote,
    getTransactionReceipt,
    getBlock,
    isAccountUnlocked
};
