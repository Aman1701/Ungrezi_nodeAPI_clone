const { string } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  language: {
    type: String
  },
  incubatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creator'
  },
  body: {
    type: String,
  },
},{
  timestamps: true
});

const mydbvar = mongoose.connection.useDb('EnglishSpeakers')

const EnglishNotes = mydbvar.model("EnglishNotes", notesSchema);

module.exports = EnglishNotes;
