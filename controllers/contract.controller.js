let candidateList = ["Rama", "Nick", "Jose"];

function voteForCandidate(req, res) {
    let votedCandidates = req.body;
    if (votedCandidates && votedCandidates.length > 0)
    {
        for (let candidate of votedCandidates) {
            candidateList.find((person) => {
               if (person === candidate) {
                   let hash = contractInstance.voteForCandidate(candidate,
                       {from: web3.eth.accounts[0]});
                   if (hash) {
                       res.write(hash);
                   }
               }
            });
        }
        res.end();
    }
}

function getVotingList(req, res) {
    console.log(contractInstance);
    if (contractInstance) {
        for (let index in candidateList) {
            let voteRecieved = contractInstance.totalVotesFor.call(candidateList[index]);
            console.log(voteRecieved);
            //send data multiple times
            res.write(`Name: ${candidateList[index]} --> ${voteRecieved}\n`);
        }
        res.end();
    }

}

function getCandidateVote(req, res) {
    let candidateName = req.param('name');
    let voteRecieved = contractInstance.totalVotesFor.call(candidateName);
    res.send(`Name: ${candidateName} --> ${voteRecieved}\n`);
}

function getTransactionReceipt(req, res) {
    let receipt = web3.eth.getTransactionReceipt(req.param('hash'));
    res.send(receipt);
}

export default { voteForCandidate, getVotingList, getCandidateVote, getTransactionReceipt};
