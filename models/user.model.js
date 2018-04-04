var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/**
 * User Schema
 */
var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
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

UserSchema.statics = {
    /* login(name, id) {
        return this.findOne({name: name, id: id});
    } */
};
module.exports = mongoose.model('User', UserSchema, 'user');