const mongoose = require('mongoose');
const { Schema } = mongoose;

const sty = new Schema({
    dialogue: {
        type: String
    },
    question: String,
    options: [String],
    answer: String
})

const FrenchSchema = new Schema({
    incubatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator'
    },
    content: {
        type: String,
        default: 'story'
    },
    learner: {
        type: String,
        default: 'english',
    },
    teaching: {
        type: String,
        default: 'french',
    },
    phase: {
        type: Number,
        default: 1,
    },
    storytitle: {
        type: String,
    },
    storyimage: {
        type: Object,
    },
    persons: {
        type: Number,
        default: 2
    },
    story: [{
        type: sty
    }],
}, {
    timestamps: true
});



mongoose.pluralize(null);

const mydbvar = mongoose.connection.useDb('EnglishSpeakers')

const FrenchStories = mydbvar.model('frenchStories', FrenchSchema);

module.exports = FrenchStories;
