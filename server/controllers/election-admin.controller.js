import Candidate from "../models/candidate.model";

function getCandidateList(req, res) {
    Candidate.find({}, function(err, candidates) {
        if(err) {
            console.log('ERR');
        } else if(candidates) {
            res.status(200);
            res.json({candidates: candidates});
        } else {
            res.status(400);
            res.json({
                message: 'No candidates available'
            });
        }
    });
}

export default {
    getCandidateList
}