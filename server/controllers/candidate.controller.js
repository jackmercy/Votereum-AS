import Candidate from '../models/candidate.model';
import mongoose  from 'mongoose';

var ObjectId = mongoose.Types.ObjectId;

/* GET: [/list] */
function getCandidateList(req, res) {
    if (!citizenGuard(req.token) && !EaGuard(req.token)) {
        res.status(403);
        return res.json({error: true, message: 'You do not have permission to access this API'});
    }
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
    getCandidateList,
}