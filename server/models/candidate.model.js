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
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    hometown: {
        type: String,
        required: true
    },
    birthDate: {
        type : Number,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    }
});

export default mongoose.model('Candidate', CandidateSchema, 'candidate');