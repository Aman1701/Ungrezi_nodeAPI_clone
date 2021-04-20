const UserInfo = require('../../models/userInfo/EnglishUserInfo')

exports.userInfo = async (req, res, next) => {
    const { languageDetails } = req.body;
    console.log(req.body.languageDetails);
    const learnerId = req.params.id;
    let addInfo = new UserInfo({ languageDetails, learnerId })

    UserInfo.findOne({ learnerId: req.params.id })
        .then(info => {
            if (info) {
                var message = { error: true, success: false, message: 'User info already exists!!' };
                res.json(message);
            } else {
                addInfo.save()
                    .then((added) => {
                        console.log(added);
                        var message = { error: false, success: true, message: added };
                        res.json(message);
                    })
                    .catch(err => {
                        console.log(err);
                        var message = { error: true, success: false, message: err };
                        res.json(message);
                    })
            }
        }).catch(err => {
            console.log(err);
            var message = { error: true, success: false, message: err };
            res.json(message);
        })


}


// ----------------------------All GET request questions fetched from here----------------------------


exports.getuserInfo = (req, res, next) => {

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    UserInfo.findOne({ learnerId: req.params.id })
        .then(data => {
            if (!(data)) {
                var message = { error: true, success: false, message: 'No data available' };
                res.json(message);
            }
            else {
                console.log(data);
                var message = { error: false, success: true, message: data };
                res.json(message);
            }
        })
        .catch(err => {
            console.log(err);
            var message = { error: true, success: false, message: err };
            res.json(message);
        })
}

exports.getInfoTopic = (req, res, next) => {
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    UserInfo.findOne({ learnerId: req.params.id })
        .then(data => {
            if (!(data)) {
                var message = { error: true, success: false, message: 'No data available' };
                res.json(message);
            }
            else {
                if (!data.languageDetails.some(detail => detail.language.toLowerCase() === req.params.language.toLowerCase())) {
                    var message = { error: true, success: false, message: "Language not found!" };
                    res.json(message);
                } else {
                    data.languageDetails.map(eachObject => {
                        if (eachObject.language.toLowerCase() === req.params.language.toLowerCase()) {
                            if (!eachObject.completedTopics.some(topic => topic.topic === req.params.topic)) {
                                var message = { error: true, success: false, message: "Topic Not Found!" };
                                res.json(message);
                            } else {
                                topicInfo = eachObject.completedTopics.filter(topic => topic.topic === req.params.topic)
                                console.log(topicInfo[0]);
                                var message = { error: false, success: true, message: topicInfo[0] };
                                res.json(message);
                            }
                        }
                    })
                }
            }
        })
        .catch(err => {
            console.log(err);
            var message = { error: true, success: false, message: err };
            res.json(message);
        })
}

/************************************All Updates Routes are defined here*********************************************/

exports.addLanguage = (req, res, next) => {
    UserInfo.findOne({ learnerId: req.params.id })
        .then(data => {
            if (!(data)) {
                var message = { error: true, success: false, message: "No data available!" };
                res.json(message);
            }
            else {
                if (data.languageDetails.some(detail => detail.language.toLowerCase() === req.body.language.toLowerCase())) {
                    var message = { error: true, success: false, message: "Language already exists!" };
                    res.json(message);
                } else {
                    const newLang = {
                        completedTopics: [],
                        language: req.body.language,
                        reason: req.body.reason,
                        xp: req.body.xp,
                        crown: req.body.xp
                    }
                    data.languageDetails.push(newLang)
                    data.save()
                        .then(updated => {
                            console.log(updated);
                            var message = { error: false, success: true, message: updated };
                            res.json(message);
                        }).catch(err => {
                            console.log(err);
                            var message = { error: true, success: false, message: err };
                            res.json(message);
                        })
                }
            }
        }).catch(err => {
            console.log(err);
            var message = { error: true, success: false, message: err };
            res.json(message);
        })
}

exports.addXP = (req, res, next) => {
    UserInfo.findOne({ learnerId: req.params.id })
        .then(data => {
            if (!(data)) {
                var message = { error: true, success: false, message: "No data available!" };
                res.json(message);
            }
            else {
                if (!data.languageDetails.some(detail => detail.language.toLowerCase() === req.body.language.toLowerCase())) {
                    var message = { error: true, success: false, message: "Language not found!" };
                    res.json(message);
                } else {
                    data.languageDetails.map(eachObject => {
                        if (eachObject.language.toLowerCase() === req.body.language.toLowerCase()) {
                            eachObject.xp = eachObject.xp + req.body.xp;
                        }
                    })
                    data.save()
                        .then(updated => {
                            console.log(updated);
                            var message = { error: false, success: true, message: updated };
                            res.json(message);
                        }).catch(err => {
                            console.log(err);
                            var message = { error: true, success: false, message: err };
                            res.json(message);
                        })
                }
            }
        }).catch(err => {
            console.log(err);
            var message = { error: true, success: false, message: err };
            res.json(message);
        })
}

exports.addCrown = (req, res, next) => {
    UserInfo.findOne({ learnerId: req.params.id })
        .then(data => {
            if (!(data)) {
                var message = { error: true, success: false, message: "No data available!" };
                res.json(message);
            }
            else {
                if (!data.languageDetails.some(detail => detail.language.toLowerCase() === req.body.language.toLowerCase())) {
                    var message = { error: true, success: false, message: "Language not found!" };
                    res.json(message);
                } else {
                    data.languageDetails.map(eachObject => {
                        if (eachObject.language.toLowerCase() === req.body.language.toLowerCase()) {
                            eachObject.crown = eachObject.crown + req.body.crown;
                        }
                    })
                    data.save()
                        .then(updated => {
                            console.log(updated);
                            var message = { error: false, success: true, message: updated };
                            res.json(message);
                        }).catch(err => {
                            console.log(err);
                            var message = { error: true, success: false, message: err };
                            res.json(message);
                        })
                }
            }
        }).catch(err => {
            console.log(err);
            var message = { error: true, success: false, message: err };
            res.json(message);
        })
}


exports.addTopic = (req, res, next) => {
    UserInfo.findOne({ learnerId: req.params.id })
        .then(data => {
            if (!(data)) {
                var message = { error: true, success: false, message: "No data available!" };
                res.json(message);
            }
            else {
                if (!data.languageDetails.some(detail => detail.language.toLowerCase() === req.body.language.toLowerCase())) {
                    var message = { error: true, success: false, message: "Language not found!" };
                    res.json(message);
                } else {
                    console.log("body", req.body);
                    data.languageDetails.map(eachObject => {
                        if (eachObject.language.toLowerCase() === req.body.language.toLowerCase()) {
                            if (eachObject.completedTopics.some(topic => topic.topic === req.body.topic)) {
                                var message = { error: true, success: false, message: "Topic Already Exists!" };
                                res.json(message);
                            } else {
                                eachObject.completedTopics.push({
                                    topic: req.body.topic,
                                    level: req.body.level,
                                    exercise: req.body.exercise
                                })
                            }
                        }
                    })
                    data.save()
                        .then(updated => {
                            console.log(updated);
                            var message = { error: false, success: true, message: updated };
                            res.json(message);
                        }).catch(err => {
                            console.log(err);
                            var message = { error: true, success: false, message: err };
                            res.json(message);
                        })
                }
            }
        }).catch(err => {
            console.log(err);
            var message = { error: true, success: false, message: err };
            res.json(message);
        })
}


exports.updateTopic = (req, res, next) => {
    UserInfo.findOne({ learnerId: req.params.id })
        .then(data => {
            if (!(data)) {
                var message = { error: true, success: false, message: "No data available!" };
                res.json(message);
            }
            else {
                if (!data.languageDetails.some(detail => detail.language.toLowerCase() === req.body.language.toLowerCase())) {
                    var message = { error: true, success: false, message: "Language not found!" };
                    res.json(message);
                } else {
                    data.languageDetails.map(eachObject => {
                        if (eachObject.language.toLowerCase() === req.body.language.toLowerCase()) {
                            eachObject.completedTopics.map(eachTopic => {
                                if (eachTopic.topic === req.body.topic) {
                                    eachTopic.level = req.body.level,
                                        eachTopic.exercise = req.body.exercise
                                }
                            })
                        }
                    })
                    data.save()
                        .then(updated => {
                            console.log(updated);
                            var message = { error: false, success: true, message: updated };
                            res.json(message);
                        }).catch(err => {
                            console.log(err);
                            var message = { error: true, success: false, message: err };
                            res.json(message);
                        })
                }
            }
        }).catch(err => {
            console.log(err);
            var message = { error: true, success: false, message: err };
            res.json(message);
        })
}