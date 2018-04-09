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

function voteCandidate(req, res) {
    console.log(VotingContract);
    if (contractInstance) {
        var hash = Voting.voteForCandidate('Rama', {from: web3.eth.accounts[0]});
        console.log(hash);
        res.write("       " + hash);
        //getTransactionAddress(res, hash);
    }

}

function getVotingList(req, res) {
    console.log(contractInstance);
    if (contractInstance) {
        for (var index in candidateList) {
            var voteRecieved = contractInstance.totalVotesFor.call(candidateList[index]);
            //send data multiple times
            res.write(`Name: ${candidateList[index]} --> ${voteRecieved}\n`);
        }
        res.end();
    }

}

/*function getTransactionAddress(res, hash) {
    web3.eth.getTransaction(hash, (address) => {
        res.write(address);
        res.end();
    });
}*/

export default { connect, voteCandidate, getVotingList };
