import mongoose from 'mongoose';
/**
 * User Schema
 */
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
/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Statics
 */

export default mongoose.model('BlockchainAccount', BlockchainAccount, 'blockchain-account');