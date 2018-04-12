import Candidate from '../models/candidate.model';


/* GET: [/list] */
function getCandidateList(req, res) {
    Candidate.find({}, function(err, candidates) {
        if(err) {
            console.log('ERR');
        } else if(candidates.length > 0) {
            res.status(200);
            res.json(candidates);
        } else {
            const message = {
                message: 'No candidate is found'
            }
            res.json(message);
        }
    });
}

export default {
    getCandidateList
}