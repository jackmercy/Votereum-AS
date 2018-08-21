import mongoose from 'mongoose';
/**
 * User Schema
 */
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
    }
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

UserSchema.statics.getUserByID = function(citizenId) {
    return this.findOne({id: citizenId});
}

export default mongoose.model('User', UserSchema, 'user');