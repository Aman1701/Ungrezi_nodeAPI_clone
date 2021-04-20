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

const SpanishSchema = new Schema({
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
        default: 'spanish',
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

const SpanishStories = mydbvar.model('spanishStories', SpanishSchema);

module.exports = SpanishStories;
