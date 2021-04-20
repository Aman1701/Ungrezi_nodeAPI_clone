const Joi = require("joi");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  url: {
      type:String,
      unique:true
  },
  title: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
  },
  author: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

function validateBlog(Blog) {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    body: Joi.string().required(),
    category: Joi.string().required(),
  });

  return schema.validate(Blog, { escapeHtml: true });
}

exports.Blog = Blog;
exports.validateBlog = validateBlog;
