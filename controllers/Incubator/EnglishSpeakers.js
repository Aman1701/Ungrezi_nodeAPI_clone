const french = require('../../models/incubator/EnglishSpeak/french');
const spanish = require('../../models/incubator/EnglishSpeak/spanish');


// ----------------------------All POST request questions posted from here----------------------------

exports.frenchQuestions = (req, res, next) => {
    const { incubatorId ,content, learner, type, teaching, topic, level, exercise, questionType, question, options, options2, answer, explanation } = req.body;
    let questionImage
    let optionImage
    let answerImage
    let explanationImage
    let option2Image
    if (req.files.questionImage) {
        questionImage = req.files.questionImage[0]
    }
    if (req.files.optionImage1) {
        optionImage = [req.files.optionImage1[0], req.files.optionImage2[0], req.files.optionImage3[0]]
    }
    if (req.files.answerImage) {
        answerImage = req.files.answerImage[0]
    }
    if (req.files.explanationImage) {
        explanationImage = req.files.explanationImage[0]
    }
    if (req.files.C2optionImage1) {
        option2Image = [req.files.C2optionImage1[0], req.files.C2optionImage2[0], req.files.C2optionImage3[0]]
    }

    let addQues = new french({ incubatorId ,content, learner, type, teaching, topic, level, exercise, questionType, question, questionImage, options, options2, optionImage, option2Image, answer, answerImage, explanation, explanationImage });
    addQues.save()
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
}


exports.spanishQuestions = (req, res, next) => {
    const { incubatorId, content, learner, type, teaching, topic, level, exercise, questionType, question, options, options2, answer, explanation } = req.body;
    let questionImage
    let optionImage
    let answerImage
    let explanationImage
    let option2Image
    if (req.files.questionImage) {
        questionImage = req.files.questionImage[0]
    }
    if (req.files.optionImage1) {
        optionImage = [req.files.optionImage1[0], req.files.optionImage2[0], req.files.optionImage3[0]]
    }
    if (req.files.answerImage) {
        answerImage = req.files.answerImage[0]
    }
    if (req.files.explanationImage) {
        explanationImage = req.files.explanationImage[0]
    }
    if (req.files.C2optionImage1) {
        option2Image = [req.files.C2optionImage1[0], req.files.C2optionImage2[0], req.files.C2optionImage3[0]]
    }

    let addQues = new spanish({ incubatorId, content, learner, type, teaching, topic, level, exercise, questionType, question, questionImage, options, options2, optionImage, option2Image, answer, answerImage, explanation, explanationImage });
    addQues.save()
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
}


// ----------------------------All GET request questions fetched from here----------------------------


exports.getfrenchQuestions = (req, res, next) => {

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    french.aggregate([{ $sample: { size: 10 } }])
        .then(ques => {
            if (isEmpty(ques)) {
                var message = { error: false, message: "No questions are available Right now!" };
                res.json(message);
            }
            else {
                console.log(ques);
                var message = { success: true, message: ques };
                res.json(message);
            }
        })
        .catch(err => {
            console.log(err);
            var message = { success: false, err: err };
            res.json(message);
        })
}


exports.getspanishQuestions = (req, res, next) => {

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    spanish.aggregate([{ $sample: { size: 10 } }])
        .then(ques => {
            if (isEmpty(ques)) {
                var message = { error: false, message: "No questions are available Right now!" };
                res.json(message);
            }
            else {
                console.log(ques);
                var message = { success: true, message: ques };
                res.json(message);
            }
        })
        .catch(err => {
            console.log(err);
            var message = { success: false, err: err };
            res.json(message);
        })
}