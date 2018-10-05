import mongoose from 'mongoose';
import CitizenModel from './citizen.model';
/**
 * User Schema
 */
const Citizen = CitizenModel;
const UserSchema = new mongoose.Schema({
    citizenId: {
        type: String,
        required: true,
        unique: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        max: 66
    },
    isVote: {
        type: Boolean
    },
    isFirstTimeLogIn: {
        type: Boolean
    },
    hasBlockchainAccount: {
        type: Boolean,
        required: true
    }
}, { toObject: { virtuals: true }});

UserSchema.virtual('Citizen', {
    ref: 'Citizen',
    localField: 'citizenId',
    foreignField: 'citizenId',
    justOne: true
});
/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
export default mongoose.model('User', UserSchema, 'user');