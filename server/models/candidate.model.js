import mongoose from 'mongoose';

/**
 * Candidate schema
 */
const CandidateSchema = new mongoose.Schema({
    _id:  mongoose.Schema.Types.ObjectId ,
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    },
/*    party: {
        type: String,
        required: true
    },
    homeStay: {
        type: String,
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
    },*/
    avatar: {
        type: String,
        required: true
    }
});

export default mongoose.model('Candidate', CandidateSchema, 'candidate');