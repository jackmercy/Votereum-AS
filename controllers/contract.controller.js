var candidateList = ["Rama", "Nick", "Jose"];
//var transactionHash;

import express from 'express';


//Connect to blockhain
function connect(req, res) {

}

// NOTE: to get param value in /vote/:id use req.params.id

/* POST: [/voting] */
/* request JSON { "candidates": ["id1","id2", "id-N"] } */
function voteforCandidates(req, res) {
    if (contractInstance) {
        var hash = contractInstance.voteForCandidates(req.body.candidates, {from: web3.eth.accounts[0]});
        if(hash) {
            res.send(hash);
            console.log(hash);
        }
        res.end();
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
    connect,
    voteforCandidates,
    getVotingList,
    getCandidateVote,
    getTransactionReceipt
};
