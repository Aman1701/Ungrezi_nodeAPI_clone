const express = require("express");
const router = express.Router();
const multer = require('multer');

const englishCourse = require('../../../models/course/HindiSpeak/englishTopics');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/incubQuestions');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// ********************** POST a new Topic **************************

router.post('/addTopic/:id/hindi/english', upload.single("topicImage"), (req, res, next) => {
    const { content, learner, teaching, topic, position, color, levels, exercises } = req.body;
    const creator = req.params.id;
    if (req.file) {
        topicImage = req.file;
    } else {
        topicImage = null;
    }

    let addTopic = new englishCourse({ creator, content, learner, teaching, topic, levels, position, color, exercises, topicImage });
    addTopic.save()
        .then(added => {
            console.log(added);
            var message = { error: false, success: true, message: added };
            res.json(message);
        })
        .catch(err => {
            console.log(err);
            var message = { error: true, success: false, err: err };
            res.json(message);
        })
})

// ********************** GET all Topic **************************

router.get('/getTopic/hindi/english', (req, res, next) => {

    englishCourse.find()
        .then(topics => {
            console.log(topics);
            var topics = { error: false, success: true, message: topics };
            res.json(topics);
        })
        .catch(err => {
            console.log(err);
            var message = { error: true, success: false, err: err };
            res.json(message);
        })

})

// ********************** GET a particular Topic **************************

router.get('/getTopic/:id/hindi/english/:topicName', (req, res, next) => {

    englishCourse.findOne({ topic: req.params.topicName, creator: req.params.id })
        .then(topic => {
            console.log(topic);
            res.json(topic);
        })
        .catch(err => {
            console.log(err);
            var message = { error: true, success: false, err: err };
            res.json(message);
        })

})

// ********************** UPDATE a particular Topic **************************

router.post('/updateTopic/:id/hindi/english/:topicName', (req, res, next) => {
    englishCourse.findOne({ topic: req.params.topicName })
        .then(topic => {
            topic.levels = req.body.levels;
            topic.exercises = req.body.exercises;
            topic.save()
                .then(added => {
                    console.log(added);
                    var message = { error: false, success: true, message: added };
                    res.json(message);
                }).catch(err => {
                    console.log(err);
                    var message = { error: true, success: false, err: err };
                    res.json(message);
                })
        })
        .catch(err => {
            console.log(err);
            var message = { error: true, success: false, err: err };
            res.json(message);
        })
})

module.exports = router;