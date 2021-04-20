const express = require("express");
const router = express.Router();
const multer = require('multer');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const { Learner } = require("../../models/users/learner");

const {
    upload: S3Upload,
    deleteObjects: S3Delete,
} = require("../../services/upload_s3");
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5242880,
    },
    fileFilter: async (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            req.fileTypeError = "Only .png, .jpg and .jpeg format allowed!";
            cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});


router.put("/editProfile/:id", upload.single("profileimg"), async (req, res) => {

    let filename, url;
    const id = req.params.id;
    const { email, name, dob } = req.body;
    let profileimg;

    Learner.findOne({ _id: id }, async function (err, user) {
        if (err) {
            res.json({ error: true, message: `Error while finding the user with this ID`, errMessage: err })
        } else if (user) { //if user exists

            if (req.body.email) {
                user.email = email;
            }
            if (req.body.name) {
                user.name = name;
            }
            if (req.body.dob) {
                user.dob = new Date(dob);
            }
            if (req.file) {
                filename = crypto.randomBytes(20).toString("hex") + req.file.originalname;
                url = await S3Upload(req.file.buffer, filename, req.file.mimetype);
                user.image = url
                console.log(url);
            }
            user.save(function (err, result) {
                if (err) {
                    res.json({
                        error: true,
                        message: err
                    })
                } else if (result) {
                    console.log(result);
                    res.json({
                        error: false,
                        status: "Profile Details updated successfully",
                        message: result,
                        token: user.generateAuthToken()
                    })
                } else {
                    res.json({
                        error: true,
                        message: 'Error updating user details'
                    })
                }
            })
        }
        else {//if no such user exists
            res.json({ error: true, message: `No such user with the given id exists` });
        }
    })
});


module.exports = router