const { object } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const englishTopicSchema = new Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator'
    },
    color: {
        type: String
    },
    content: {
        type: String,
        default: 'course'
    },
    learner: {
        type: String,
        default: 'hindi'
    },
    teaching: {
        type: String,
        default: 'english'
    },
    position: {
        type: Number,
        default: 1
    },
    topic: {
        type: String,
        required: true
    },
    topicImage: {
        type: Object,
    },
    levels: {
        type: Number,
        default: 1
    },
    exercises: {
        type: Array,
        default: [1]
    }
})

const mydbvar = mongoose.connection.useDb('HindiSpeakers')

const englishCourse = mydbvar.model('EnglishCourses',englishTopicSchema);

module.exports = englishCourse;