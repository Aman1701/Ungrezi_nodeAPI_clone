const Joi = require("joi");
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
  },
});
