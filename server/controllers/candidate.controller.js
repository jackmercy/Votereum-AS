import Candidate from '../models/candidate.model';
import mongoose  from 'mongoose';

var ObjectId = mongoose.Types.ObjectId;

/* GET: [/list] */
function getCandidateList(req, res) {
    if (!citizenGuard(req.token) || !EaGuard(req.token)) {
        res.status(403);
        res.json({error: true, message: 'You do not have permission to access this API'});
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
/* POST [/getCandidateById]
    JSON req : {
        "candidateIds": ["0234","242"]
    } */
function getCandidatesById(req, res) {
    if (!citizenGuard(req.token) || !EaGuard(req.token)) {
        res.status(403);
        res.json({error: true, message: 'You do not have permission to access this API'});
    }
    var listIds = req.body.candidateIds;
    const candidateIds = listIds.map( id => { 
        id = new ObjectId(id);
        return id;
    });
    Candidate.find().where('_id').in(candidateIds).exec(function(err, candidateName) {
        if(err) {
            console.log(err);
        } else if(candidateName) {
            res.status(200);
            candidateName = candidateName.map(val => val.name);
            const message = {
                candidateNames: candidateName
            }
            res.json(message);
        } else {
            res.status(504);
            res.send("Something wrong /w the server");
        }
    });

}

function postCreateCandidate(req, res) {
    if (!EaGuard(req.token)) {
        res.status(403);
        res.json({error: true, message: 'You do not have permission to access this API'});
    }
    const newCandidate = new Candidate(req.body);

    Candidate.find({name: req.body.name}, function(err, candidate) {
        if( candidate.length === 0) {
            newCandidate._id = new mongoose.Types.ObjectId;
            newCandidate.save();
            res.status(201);
            res.json(newCandidate);
        }
    });
}

export default {
    getCandidateList,
    getCandidatesById,
    postCreateCandidate
}