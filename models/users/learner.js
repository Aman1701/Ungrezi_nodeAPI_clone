const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const learnerAccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  authType: {
    type: String,
    required: true,
  },
  fbId: {
    type: String
  },
  image: {
    type: String,
    default: ''
  },
  dob: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

learnerAccountSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      type: "learner",
      image: this.image,
      createdAt: this.createdAt,
      authType: this.authType,
      dob: this.dob
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Learner = mongoose.model("Learner", learnerAccountSchema);

function validateLearnerAccount(account) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });

  return schema.validate(account, { escapeHtml: true });
}

exports.Learner = Learner;
exports.validateLearnerAccount = validateLearnerAccount;
