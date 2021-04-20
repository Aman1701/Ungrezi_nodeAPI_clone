const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const crypto = require("crypto");

const EnglishNotes = require('../models/notes/englishNotes');
const HindiNotes = require('../models/notes/hindiNotes');

const {
  upload: S3Upload,
  deleteObjects: S3Delete,
} = require("../services/upload_s3");

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

/************************ ADDING ENGLISH NOTE(from main website) ************************/

router.post("/english/:lang/:id", async (req, res) => {
  const note = new EnglishNotes({
    incubatorId: req.params.id,
    body: req.body.body,
    topic: req.body.topic,
    language: req.params.lang
  });
  console.log(req.body.body);

  let existingNote = await EnglishNotes.findOne({ topic: req.body.topic, language: req.params.lang })
  if(existingNote){
    existingNote.body = req.body.body;
    existingNote.save()
    .then(() => {
      res.send('Note Updated');
    }).catch(err => console.log(err))
  }

  await note.save();

  res.send("Saved!");
});

router.get("/english/:lang/:topic", (req, res) => {
  EnglishNotes.findOne({ topic: req.params.topic, language: req.params.lang })
    .then((note) => {
      if (note) {
        res.json(note);
      }
      else {
        res.json({ body: 'Note not added for this topic.' });
      }
    }).catch(err => res.send(err))
})


//Uploading img handler for AWS S3
router.post("/uploadNotesImg", upload.single("file"), async (req, res) => {
  const filename =
    crypto.randomBytes(20).toString("hex") + req.file.originalname;

  try {
    const url = await S3Upload(req.file.buffer, filename, req.file.mimetype);
    res.send({ location: url });
  } catch (ex) {
    res.status(500).send("Something went wrong");
  }
});



// -----------------------------------Hindi Notes-----------------------

router.post("/hindi/:lang/:id", async (req, res) => {
  const note = new HindiNotes({
    incubatorId: req.params.id,
    body: req.body.body,
    topic: req.body.topic,
    language: req.params.lang
  });

  let existingNote = await HindiNotes.findOne({ topic: req.body.topic, language: req.params.lang })
  if(existingNote){
    existingNote.body = req.body.body;
    existingNote.save()
    .then(() => {
      res.send('Note Updated');
    }).catch(err => console.log(err))
  }
  
  await note.save();

  res.send("Saved!");
});

router.get("/hindi/:lang/:topic", (req, res) => {
  HindiNotes.findOne({ topic: req.params.topic, language: req.params.lang })
    .then((note) => {
      if (note) {
        res.json(note);
      }
      else {
        res.json({ body: 'Note not added for this topic.' });
      }
    }).catch(err => res.send(err))
})


module.exports = router;