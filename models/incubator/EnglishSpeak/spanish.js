const mongoose = require('mongoose');
const { Schema } = mongoose;

const SpanishSchema = new Schema({
    incubatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator'
    },
    content: {
        type: String,
        default: 'course'
    },
    learner: {
        type: String,
        default: 'english',
    },
    teaching: {
        type: String,
        default: 'spanish',
    },
    type: {
        type: String
    },
    topic: {
        type: String,
    },
    level: {
        type: Number,
    },
    exercise: {
        type: Number,
    },
    questionType: {
        type: String,
    },
    question: {
        type: String,
    },
    questionImage: {
        type: Object
    },
    options: {
        type: Array,
        default: []
    },
    options2: {
        type: Array,
        default: [],
    },
    optionImage: {
        type: Array,
        default: []
    },
    answer: {
        type: String,
        required: [true, 'provide answer']
    },
    answerImage: {
        type: Object,
        default: null
    },
    explantion: {
        type: String,
        default: ""
    },
    explantionImage: {
        type: Object,
        default: null
    }
});

mongoose.pluralize(null);

const mydbvar = mongoose.connection.useDb('EnglishSpeakers')

const Spanish = mydbvar.model('spanish', SpanishSchema);

module.exports = Spanish;
