var candidateList = ['5ac5e52f320aa0188c43c3e9', '5acc1b34fbd6a43d3c138c98', '5acc1b43fbd6a43d3c138c99','5acc1b4cfbd6a43d3c138c9a'];
//var transactionHash;

import express from 'express';
import User from '../models/user.model';

//Connect to blockhain
function connect(req, res) {

}

// contractInstance.updateCandidateList(candidateList);
/* POST: [/createCandidateList]
    req JSON {
        "candidateIDs": ["id1", "id2"],
        "citizenID": "333"
    }
    For admin only
*/

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
                Txhash = contractInstance.updateCandidateList(list, {from: web3.eth.accounts[1], gas: 100000});

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
function voteForCandidates(req, res) {
    User.findOne({id: req.body.citizenID}, function(err, _user) {
        if(err) {
            console.log('ERR');
        } else if(_user && _user.isVote === false && _user.role === 'citizen') {
            var Txhash;
            /* Handle contract call */
            if (contractInstance) {
                Txhash = contractInstance.voteForCandidates(req.body.candidates, {from: web3.eth.accounts[1], gas: 1000000});
                if(Txhash) {
                    const res_msg = {
                        hash: Txhash
                    }
                    res.json(res_msg);
                }
            }
            /* Update user information */
            var user = new User(_user);
            // dev -> always false.
            // user.isVote = true; 
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
}

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
    let block = web3.eth.getBlock(req.body.block, {from: web3.eth.accounts[1], gas: 1000000});
    res.json(block);
}

export default {
    createCandidateList,
    connect,
    voteForCandidates,
    getVotingList,
    getCandidateVote,
    getTransactionReceipt,
    getBlock
};
