const mongoose = require('mongoose');
const { Schema } = mongoose;

const EnglishSchema = new Schema({
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
        default: 'hindi',
    },
    teaching: {
        type: String,
        default: 'english',
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

const mydbvar = mongoose.connection.useDb('HindiSpeakers')

const English = mydbvar.model('english', EnglishSchema);

module.exports = English;
