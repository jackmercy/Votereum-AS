import mongoose from 'mongoose';

const CitizenSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
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
    isPasswordChanged: {
        type: Boolean,
        required: true
    },
    defaultPassword: {
        type: String,
        required: false
    }
});


export default mongoose.model('Citizen', CitizenSchema, 'citizen');