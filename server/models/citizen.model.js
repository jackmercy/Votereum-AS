import mongoose from 'mongoose';

const CitizenSchema = new mongoose.Schema({
    Id_number: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    homeTown: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    hasSystemAccount: {
        type: Boolean,
        required: true
    }
});


export default mongoose.model('Citizen', CitizenSchema, 'citizen');