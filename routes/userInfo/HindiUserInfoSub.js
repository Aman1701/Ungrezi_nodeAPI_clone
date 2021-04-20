const express = require("express");
const router = express.Router();

const UserInfoController = require('../../controllers/UserInfo/HindiUserInfoController')

router.post('/hindi/postUserData/:id', UserInfoController.userInfo)

router.get('/hindi/getUserData/:id', UserInfoController.getuserInfo)

router.post('/hindi/updateUserData/addLanguage/:id', UserInfoController.addLanguage)

router.post('/hindi/updateUserData/addXP/:id', UserInfoController.addXP)

router.post('/hindi/updateUserData/addTopic/:id', UserInfoController.addTopic)

router.post('/hindi/updateUserData/updateTopic/:id', UserInfoController.updateTopic)

router.get('/hindi/getTopicInfo/:language/:topic/:id', UserInfoController.getInfoTopic)

module.exports = router