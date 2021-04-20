const Joi = require("joi");
const mongoose = require("mongoose");

const blockMatchQuestionSchema = new mongoose.Schema({
  statement: {
    type: String,
    required: true,
  },
  questionBlocks:{
    type:[String],
    required:true
  },
  answer: {
    type: [String],
    required: true,
  },
  explanation: {
    type: String,
  },
});

const blockMatchQuestion = mongoose.model("blockMatchQuestion", blockMatchQuestionSchema);

function validateMatchQuestion(question) {
  const schema = Joi.object({
    statement: Joi.string().required(),
    questionBlocks: Joi.array().items(Joi.string().required()).required(),
    answer: Joi.array().items(Joi.string().required()).required(),
    explanation: Joi.string().allow(""),
  });

  return schema.validate(question, { escapeHtml: true });
}

exports.blockMatchQuestion = blockMatchQuestion;
exports.validateMatchQuestion = validateMatchQuestion;
