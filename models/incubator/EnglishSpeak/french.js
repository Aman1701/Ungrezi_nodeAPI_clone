const mongoose = require('mongoose');
const { Schema } = mongoose;

const FrenchSchema = new Schema({
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
        default: 'french',
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

const French = mydbvar.model('french', FrenchSchema);

module.exports = French;
