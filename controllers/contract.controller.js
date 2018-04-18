var candidateList = ["Rama", "Nick", "Jose"];
//var transactionHash;

import express from 'express';


//Connect to blockhain
function connect(req, res) {

}

// contractInstance.updateCandidateList(candidateList);
/* POST: [/createCandidateList] 
    req JSON {
        "candidateIDs": ["id1", "id2"]
    }
*/

/* Note: web3.eth.estimateGas
    Executes a message call or transaction, which is directly executed in the VM of the node,
    but never mined into the blockchain and returns the amount of the gas used. */
function createCandidateList(req, res) {
    if (contractInstance) {
        var list = req.body.candidateIDs;
        var Txhash = contractInstance.updateCandidateList(list, {from: web3.eth.accounts[0], gas: 3000000});

        if (Txhash) {
            candidateList = list;
            const res_msg = {
                hash: Txhash,
                candidateIDs: candidateList
            }
            res.json(res_msg);
        }
        // res.status(500);
    }
}
// NOTE: to get param value in /vote/:id use req.params.id

/* POST: [/voting] */
/* request JSON { "candidates": ["id1","id2", "id-N"] } */
function voteForCandidates(req, res) {
    if (contractInstance) {
        var Txhash = contractInstance.voteForCandidates(req.body.candidates, {from: web3.eth.accounts[0]});
        if(Txhash) {
            const res_msg = {
                hash: Txhash
            }
            res.json(res_msg);
        }
    }
}

/* GET: [/votingList] */
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

/* GET: [/voteResult/:id] */
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
*/
function getTransactionReceipt(req, res) {
    let receipt = web3.eth.getTransactionReceipt(req.body.hash);
    res.json(receipt);
}

export default {
    createCandidateList,
    connect,
    voteForCandidates,
    getVotingList,
    getCandidateVote,
    getTransactionReceipt
};
