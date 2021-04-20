const Joi = require("joi");
const mongoose = require("mongoose");

const blockQuestionSchema = new mongoose.Schema({
  statement: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
  },
});

const blockQuestion = mongoose.model("blockQuestion", blockQuestionSchema);

function validateQuestion(question) {
  const schema = Joi.object({
    statement: Joi.string().required(),
    options: Joi.array().items(Joi.string().required()).required(),
    answer: Joi.string().required(),
    explanation: Joi.string().allow(""),
  });

  return schema.validate(question, { escapeHtml: true });
}

exports.blockQuestion = blockQuestion;
exports.validateQuestion = validateQuestion;
