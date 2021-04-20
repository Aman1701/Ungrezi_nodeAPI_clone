const express = require("express");
const router = express.Router();
const multer = require('multer');

const HindiSpeakers = require('../../controllers/Incubator/HindiSpeakers')
const english = require('../../models/incubator/HindiSpeak/english');

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


// ----------------------------------All POST routes are placed here-------------------------------

router.post('/addques/hindiTo/english',
    upload.fields([
        { name: "questionImage" },
        { name: "optionImage1" },
        { name: "optionImage2" },
        { name: "optionImage3" },
        { name: "C2optionImage1" },
        { name: "C2optionImage2" },
        { name: "C2optionImage3" },
        { name: "answerImage" },
        { name: "explanationImage" },
    ]),
    HindiSpeakers.englishQuestions
)



// ----------------------------------All GET routes are placed here-------------------------------

router.get('/getques/hindiTo/english', HindiSpeakers.getEnglishQuestions)

//-----------------------------------Get questions based on topic, level, exercise --------------------
router.get('/getques/hindiTo/english/:topic/:type/:level/:exercise', (req,res,next) => {

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    english.find({ topic: req.params.topic, level: req.params.level, exercise: req.params.exercise, type: {$in: [req.params.type, 'All']} })
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
})

router.get('/getques/hindiTo/english/:topic/:type/:level/:exercise', (req,res,next) => {

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    english.find({ topic: req.params.topic, level: req.params.level, exercise: req.params.exercise, type: {$in: [req.params.type, 'All']} })
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
})


//------------------------------ DELETE A QUESTION BY ID ----------------------------

router.delete('/deleteques/hindiTo/english/:id', (req,res) => {
    english.findOneAndRemove({ _id : req.params.id})
    .then((ques) => {
        if(ques){
            res.send('Question Deleted!!')
        }else{
            res.send('Question Not Found!!')
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
})

module.exports = router;