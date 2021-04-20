const express = require("express");
const router = express.Router();
const multer = require('multer');

const HindiListeners = require('../../controllers/Stories/HindiListeners')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/stories/Hindi');
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

router.post('/addStory/hindiTo/english', upload.single('storyimage'), HindiListeners.englishStories)

router.post('/addStory/hindiTo/french', upload.single('storyImage'), HindiListeners.frenchStories)


// ----------------------------------All GET routes are placed here-------------------------------

router.get('/getStory/hindiTo/english', HindiListeners.getAllenglishStories)         //for user 

router.get('/getStory/hindiTo/english/:id', HindiListeners.getOneenglishStories)     //for incubator view 


router.get('/getStory/hindiTo/french', HindiListeners.getAllfrenchStories)       //for user 

router.get('/getStory/hindiTo/french/:id', HindiListeners.getOnefrenchStories)    //for incubator view 


module.exports = router