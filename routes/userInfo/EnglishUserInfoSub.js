const express = require("express");
const router = express.Router();

const UserInfoController = require('../../controllers/UserInfo/EnglishUserInfoController')

router.post('/postUserData/:id', UserInfoController.userInfo)

router.get('/getUserData/:id', UserInfoController.getuserInfo)

router.post('/updateUserData/addLanguage/:id', UserInfoController.addLanguage)

router.post('/updateUserData/addXP/:id', UserInfoController.addXP)

router.post('/updateUserData/addCrown/:id', UserInfoController.addCrown)

router.post('/updateUserData/addTopic/:id', UserInfoController.addTopic)

router.post('/updateUserData/updateTopic/:id', UserInfoController.updateTopic)

router.get('/getTopicInfo/:language/:topic/:id', UserInfoController.getInfoTopic)

module.exports = router