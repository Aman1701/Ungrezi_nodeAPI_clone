const express = require("express");
const router = express.Router();
const multer = require('multer');

const EnglishListeners = require('../../controllers/Stories/EnglishListeners')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/stories');
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

router.post('/addStory/englishTo/french', upload.single('storyimage'), EnglishListeners.frenchStories)

router.post('/addStory/englishTo/spanish', upload.single('storyimage'), EnglishListeners.spanishStories)


// ----------------------------------All GET routes are placed here-------------------------------

router.get('/getStory/englishTo/french', EnglishListeners.getAllfrenchStories)         //for user 

router.get('/getStory/englishTo/french/:id', EnglishListeners.getOnefrenchStories)     //for incubator view 


router.get('/getStory/englishTo/spanish', EnglishListeners.getAllspanishStories)       //for user 

router.get('/getStory/englishTo/spanish/:id', EnglishListeners.getOnespanishStories)    //for incubator view 


module.exports = router