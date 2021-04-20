const mongoose = require('mongoose');
const { Schema } = mongoose;

const completedTopicsSchema = new Schema({
    topic: {
        type: String
    },
    level: {
        type: Number,
        default: 1
    },
    exercise: {
        type: Number,
        default: 1
    }
})

const languageDetailsSchema = new Schema({
    language: {
        type: String
    },
    reason: {
        type: String
    },
    crown: {
        type: Number
    },
    xp: {
        type: Number
    },
    completedTopics: [{
        type: completedTopicsSchema
    }]
})

const UserInfoSchema = new Schema({
    learnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Learner"
    },
    languageDetails: [{
        type: languageDetailsSchema
    }]
})

mongoose.pluralize(null);

const mydbvar = mongoose.connection.useDb('HindiSpeakers')

module.exports = mydbvar.model('HindiUserInfo', UserInfoSchema);