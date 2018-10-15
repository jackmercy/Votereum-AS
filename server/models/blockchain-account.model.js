import mongoose from 'mongoose';

const BlockchainAccount = new mongoose.Schema({
    citizenId: {
        type: String,
        required: true,
        unique: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model('BlockchainAccount', BlockchainAccount, 'blockchain-account');