const express = require("express");
const router = express.Router();

const { Learner } = require('../models/users/learner');

router.get('/users/names', (req, res, next) => {

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    // Learner.aggregate([{ $match: { name: true } }, { $sample: { size: 8 } }])
    Learner.find({}, { _id: 0, name: true }).skip(Math.random(3) * 6).limit(8)
        .then(user => {
            if (isEmpty(user)) {
                var message = { error: false, message: "No Users available!" };
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