var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Candidate schema
 */
var CandidateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    homeStay: {
        type: String,
        required: true
    },
    totalVote: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    isWinner: {
        type: Boolean,
        required: true
    },
    totalAssets: {
        type: Number,
        require: function() {
            return this.totalAssets > 1000000
        }
    },
    brief: {
        type: String,
        required: true,
        max: 185
    },
    biography: {
        type: String,
        required: true
    },
    education: String,
    birthday: {
        type: Date,
        required: true
    },
    education: String,
    avatar: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Candidate', CandidateSchema, 'candidate');