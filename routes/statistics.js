const express = require("express");
const router = express.Router();

//const { Learner } = require('../models/users/learner');
const EnglishUserInfoSub = require('../models/userInfo/EnglishUserInfo');

router.get('/names/inEnglish/:lang', (req, res, next) => {

    const lang = req.params.lang;

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    // Learner.aggregate([{ $match: { name: true } }, { $sample: { size: 8 } }])
    // EnglishUserInfoSub.aggregate([{}, { _id: 0, learnerId: true }]).limit(6)
    EnglishUserInfoSub.aggregate([{
        $unwind:
        {
            path: "$languageDetails",
            includeArrayIndex: "arrayIndex"
        }
    },
    // { $match: { _id: 0 } },
    { $project: { _id: 0, language: '$languageDetails.language', xp: '$languageDetails.xp', learnerId: "$learnerId" } },
    { $sort: { "_id": 1, xp: -1 } },
    { $match: { 'language': lang } },
    ]).limit(6)
        .then(user => {
            if (isEmpty(user)) {
                var message = { error: false, message: "No Info available!" };
                res.json(message);
            }
            else {
                console.log(user);
                var message = { success: true, message: user };
                res.json(message);
            }
        })
        .catch(err => {
            console.log(err);
            var message = { success: false, err: err };
            res.json(message);
        })
})

module.exports = router