import mongoose from 'mongoose';

const BallotSchema = new mongoose.Schema({
    ballotName: {
        type: String,
        required: true,
        unique: true
    },
    startRegPhase: {
        type : Number, 
        required: function() {
            return this.startRegPhase < this.endRegPhase;
        }
    },
    endRegPhase: {
        type : Number, 
        required: function() {
            return this.endRegPhase < this.startVotingPhase;
        }
    },
    startVotingPhase: {
        type : Number, 
        required: function() {
            return this.startVotingPhase < this.endVotingPhase;
        }
    },
    endVotingPhase: {
        type : Number, 
        required: true
    },
    candidateIDs: {
        type : [String],
        required: true
    },
    currentBallot: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model('Ballot', BallotSchema, 'ballot');