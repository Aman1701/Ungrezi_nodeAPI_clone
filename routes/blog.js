const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const crypto = require("crypto");
const blogAuth = require('../middleware/blogAuth');
const {Learner} = require('../models/users/learner');
const _ = require("lodash");
const { Blog, validateBlog } = require("../models/blog/blog");
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

//Fetching all the blogs for the main page
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ timestamp: -1 }).lean();

  res.send(blogs);
});

//Login for blog
router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password || req.body.email !="tech@ungrezi.com")
    return res.status(400).send("Invalid Email or Password.");
  let token;

  const learner = await Learner.findOne({ email: req.body.email });
  if (!learner) return res.status(400).send("Invalid Email or Password.");
  const validPassword = await bcrypt.compare(
    req.body.password,
    learner.password
  );
  if (!validPassword) return res.status(400).send("Invalid Email or Password.");

  token = learner.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token");
  res.send(token);
});

//Fetching a specific blog
router.get("/:url", async (req, res) => {
  const blog = await Blog.findOne({ url: req.params.url }).lean();
  if (!blog) return res.status(404).end();

  res.send(blog);
});

//Fetching all blogs under a category (currently limit to latest 3 posts)
router.get("/category/:category", async (req, res) => {
  let { current } = req.query;
  if (!current) current = "";
  const blogs = await Blog.find({
    category: req.params.category,
    url: { $ne: current },
  })
    .sort({ timestamp: -1 })
    .limit(3)
    .lean();
  if (!blogs) return res.status(404).end();
  res.send(blogs);
});

//Adding a new blog
router.post("/add",blogAuth ,async (req, res) => {
  const { error } = validateBlog(req.body);
  if (error) return res.status(400).send(error.message);

  const blog = new Blog(
    _.pick(req.body, ["title", "category", "body", "author"])
  );
  blog.timestamp = new Date();
  blog.url = blog.title
    .toLowerCase()
    .replace(/[^\w^ ]/g, "")
    .replace(/ /g, "-");

  if (blog.url == "") {
    return res.status(400).send("Incorrect Title");
  }

  let count = await Blog.findOne({ url: new RegExp("^" + blog.url) })
    .sort({ timestamp: -1 })
    .select("url")
    .lean();
  if (count) {
    count = count["url"].replace(blog.url, "");
    if (count == "") count = 2;
    else count = Number(count) + 1;

    blog.url = blog.url + String(count);
  }

  await blog.save();

  res.send("Saved!");
});

//Uploading img handler for AWS S3
router.post("/uploadImg", blogAuth,upload.single("file"), async (req, res) => {
  const filename =
    crypto.randomBytes(20).toString("hex") + req.file.originalname;

  try {
    const url = await S3Upload(req.file.buffer, filename, req.file.mimetype);
    res.send({ location: url });
  } catch (ex) {
    res.status(500).send("Something went wrong");
  }
});

//Deleting a blog route
router.delete("/delete/:url", blogAuth,async (req, res) => {
  const blog = await Blog.findOne({ url: req.params.url }).lean();
  if (!blog) return res.status(404).end();

  const statics = blog.body.matchAll(
    /https:\/\/ungrezi-blog.s3.ap-south-1.amazonaws.com\/([\w\- \.]*\.\w+)/gm
  );
  let objects = [];
  for (i of statics) {
    objects.push(i[1]);
  }
  if (objects.length > 0) {
    S3Delete(objects)
      .then(async (response) => {
        await Blog.findOneAndDelete({ url: blog.url })
          .then(() => {
            res.send("Deleted");
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send("Error");
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error");
      });
  } else {
    await Blog.findOneAndDelete({ url: blog.url })
      .then(() => {
        res.send("Deleted");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error");
      });
  }
});

//Editing a blog
router.post("/edit/:url", blogAuth,async (req, res) => {
  const blog = await Blog.findOne({ url: req.params.url });
  if (!blog) return res.status(404).end();

  const { title, body, author, category } = req.body;

  blog.title = title;
  blog.category = category;
  blog.body = body;
  blog.author = author;

  await blog.save();

  res.send("Changes Saved");
});

module.exports = router;
