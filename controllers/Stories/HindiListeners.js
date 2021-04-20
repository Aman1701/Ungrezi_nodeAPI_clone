const EnglishStories = require('../../models/stories/HindiListeners/englishStories')
const FrenchStories = require('../../models/stories/HindiListeners/frenchStories')


// ----------------------------All POST request questions posted from here----------------------------

exports.englishStories = (req, res, next) => {
    let { incubatorId, content, learner, teaching, phase, storytitle, persons, story
    } = req.body;
    let storyimage
    console.log(req.file);
    if (req.file) {
        storyimage = req.file
    }
    story = JSON.parse(story);
    let addStory = new EnglishStories({
        incubatorId, content, learner, teaching, phase, storytitle, persons, story, storyimage
    });
    addStory.save()
        .then(added => {
            console.log(added);
            var message = { success: true, message: added };
            res.json(message);
        })
        .catch(err => {
            console.log(err);
            var message = { error: true, err: err };
            res.json(message);
        })
}

exports.frenchStories = (req, res, next) => {
    let { incubatorId, content, learner, teaching, phase, storytitle, persons, story
    } = req.body;
    let storyimage
    console.log(req.file);
    if (req.file) {
        storyimage = req.file
    }
    story = JSON.parse(story);
    let addStory = new FrenchStories({
        incubatorId, content, learner, teaching, phase, storytitle, persons, story, storyimage
    });
    addStory.save()
        .then(added => {
            console.log(added);
            var message = { success: true, message: added };
            res.json(message);
        })
        .catch(err => {
            console.log(err);
            var message = { error: true, err: err };
            res.json(message);
        })
}





// ----------------------------All GET request questions fetched from here----------------------------

exports.getAllenglishStories = (req, res, next) => {

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    EnglishStories.find()
        .then(story => {
            // if (isEmpty(story)) {
            //     var message = { error: false, message: "No stories are available Right now!" };
            //     res.json(message);
            // }
            // else {
            console.log(story);
            var message = { success: true, message: story };
            res.json(message);
            // }
        })
        .catch(err => {
            console.log(err);
            var message = { success: false, err: err };
            res.json(message);
        })
}

exports.getOneenglishStories = (req, res, next) => {

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    var id = req.params.id;
    EnglishStories.findOne({ _id: id })
        .then(story => {
            if (isEmpty(story)) {
                var message = { error: false, message: "No stories are available Right now!" };
                res.json(message);
            }
            else {
                console.log(story);
                var message = { success: true, message: story };
                res.json(message);
            }
        })
        .catch(err => {
            console.log(err);
            var message = { success: false, err: err };
            res.json(message);
        })
}

exports.getAllfrenchStories = (req, res, next) => {

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    FrenchStories.find()
        .then(story => {
            // if (isEmpty(story)) {
            //     var message = { error: false, message: "No stories are available Right now!" };
            //     res.json(message);
            // }
            // else {
            console.log(story);
            var message = { success: true, message: story };
            res.json(message);
            // }
        })
        .catch(err => {
            console.log(err);
            var message = { success: false, err: err };
            res.json(message);
        })
}

exports.getOnefrenchStories = (req, res, next) => {

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    var id = req.params.id;
    FrenchStories.findOne({ _id: id })
        .then(story => {
            if (isEmpty(story)) {
                var message = { error: false, message: "No stories are available Right now!" };
                res.json(message);
            }
            else {
                console.log(story);
                var message = { success: true, message: story };
                res.json(message);
            }
        })
        .catch(err => {
            console.log(err);
            var message = { success: false, err: err };
            res.json(message);
        })
}