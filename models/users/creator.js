const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const { string } = require("joi");

const creatorAccountSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        minlength:3,
        maxlength:255
    },
    authType:{
      type:String,
      required:true,
    },
    fbId:{
      type:String
    }
});

creatorAccountSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      type:"creator"
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Creator = mongoose.model("Creator", creatorAccountSchema);

function validatecreatorAccount(account) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  });

  return schema.validate(account, { escapeHtml: true });
}

exports.Creator = Creator;
exports.validatecreatorAccount = validatecreatorAccount;
