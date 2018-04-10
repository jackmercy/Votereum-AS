/*import Web3 from 'web3';
import fs from 'fs';
import truffleContract from 'truffle-contract';
import votingJson from './Voting.json';*/

//Important: this controller is call once one of the following route in *.route.js is accessed

//var contractInstance;
//var web3;
var candidateList = ["Rama", "Nick", "Jose"];
//var transactionHash;

import express from 'express'


//Connect to blockhain
function connect(req, res) {

}

function voteforCandidate(req, res) {
    if (contractInstance) {
        var hash = contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]});
        if (hash) {
            res.send(hash);
            console.log(hash);
        }
    }
}

function getVotingList(req, res) {
    console.log(contractInstance);
    if (contractInstance) {
        for (var index in candidateList) {
            var voteRecieved = contractInstance.totalVotesFor.call(candidateList[index]);
            console.log(voteRecieved);
            //send data multiple times
            res.write(`Name: ${candidateList[index]} --> ${voteRecieved}\n`);
        }
        res.end();
    }

}

function getCandidateVote(req, res) {
    let candidateName = req.param('name');
    var voteRecieved = contractInstance.totalVotesFor.call(candidateName);
    res.send(`Name: ${candidateName} --> ${voteRecieved}\n`);
}

function getTransactionReceipt(req, res) {
    let receipt = web3.eth.getTransactionReceipt(req.param('hash'));
    res.send(receipt);
}

export default { connect, voteforCandidate, getVotingList, getCandidateVote, getTransactionReceipt};
