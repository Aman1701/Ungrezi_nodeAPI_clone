const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { Learner, validateLearnerAccount } = require("../models/users/learner");
const { Creator, validatecreatorAccount } = require("../models/users/creator");
const authentication = require("../middleware/auth");
const { response } = require("express");
const qs = require("qs");
const { default: Axios } = require("axios");
const frontUrl = require("../utils/url");
// const {frontUrl} = require("../utils/url");
function validate(req) {
  //validating login form data from user
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(3).max(255).required(),
    type: Joi.string().required(),
  });

  return schema.validate(req, { escapeHtml: true });
}
router.post("/auth/facebook", async (req, res) => {
  console.log(req.body);
  let resp;
  console.log(frontUrl);

  resp = await Axios.get(
    "https://graph.facebook.com/v8.0/oauth/access_token?client_id=2030366623937443&client_secret=97a971630c3af224b35200a1a733e71c&redirect_uri=" +
    frontUrl +
    "&code=" +
    req.body.facebookCode
  );
  let token = resp.data.access_token;

  // console.log("Token", token);
  console.log(process.env.NODE_ENV);
  resp = await Axios.get("https://graph.facebook.com/me?access_token=" + token);
  // resp = await Axios({
  //   url: "https://graph.facebook.com/me",
  //   method: "get",
  //   params: {
  //     fields: ["id", "email", "first_name", "last_name"].join(","),
  //     access_token: token,
  //   },
  // });
  if (req.body.userType === "learner") {
    let learner = await Learner.findOne({ fbId: resp.data.id });
    if (!learner) {
      learner = new Learner();
      learner.fbId = resp.data.id;
      learner.name = resp.data.name;
      learner.authType = "facebook";
    }
    await learner.save();
    token = learner.generateAuthToken();
  } else {
    const creator = await Creator.findOne({ fbId: resp.data.id });
    if (!creator) {
      creator = new Creator();
      creator.fbId = resp.data.id;
      creator.name = resp.data.name;
      creator.authType = "facebook";
    }
    await creator.save();
    // req.session.type = "creator";
    // req.session.email = creator.email;
    // data={email:creator.email,name:creator.name}
    token = creator.generateAuthToken();
  }
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token");
  res.send(token);
});
//Login route endpoint
router.post("/auth/google", async (req, res) => {
  // console.log(req.body);
  let resp;

  resp = await Axios.post(
    "https://oauth2.googleapis.com/token",
    qs.stringify({
      code: req.body.googleCode,
      client_id:
        "916843027781-r01g97vaelq843bh9l1jnmr9j183e9a2.apps.googleusercontent.com",
      client_secret: "zLI6FHHDhbGHgmef2Ynia9yd",
      redirect_uri: frontUrl,
      grant_type: "authorization_code",
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
  let token = resp.data.access_token;

  // console.log("Token", token);
  resp = await Axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(resp.data);
  if (req.body.userType === "learner") {
    let learner = await Learner.findOne({ email: resp.data.email });
    if (!learner) {
      learner = new Learner();
      learner.email = resp.data.email;
      learner.name = resp.data.name;
      learner.image = resp.data.picture;
      learner.authType = "google";
      console.log(resp.data.image);
    }
    await learner.save();
    token = learner.generateAuthToken();
  } else {
    const creator = await Creator.findOne({ email: resp.data.email });
    if (!creator) {
      creator = new Creator();
      creator.email = resp.data.email;
      creator.name = resp.data.name;
      creator.authType = "google";
    }
    await creator.save();
    // req.session.type = "creator";
    // req.session.email = creator.email;
    // data={email:creator.email,name:creator.name}
    token = creator.generateAuthToken();
  }
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token");
  res.send(token);
});
router.post("/login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  let token;
  if (req.body.type === "learner") {
    const learner = await Learner.findOne({ email: req.body.email });
    if (!learner) return res.status(400).send("Invalid Email or Password.");
    if (learner.authType === "google") {
      return res.status(400).send("please login using google");
    }
    if (learner.authType === "facebook") {
      return res.status(400).send("please login using facebook");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      learner.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid Email or Password.");

    // req.session.email = learner.email;
    // req.session.type = "learner";
    // data={email:learner.email,name:learner.name}
    token = learner.generateAuthToken();
  } else {
    const creator = await Creator.findOne({ email: req.body.email });
    if (!creator) return res.status(400).send("Invalid Email or Password.");

    const validPassword = await bcrypt.compare(
      req.body.password,
      creator.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid Email or Password.");

    // req.session.type = "creator";
    // req.session.email = creator.email;
    // data={email:creator.email,name:creator.name}
    token = creator.generateAuthToken();
  }
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token");
  res.send(token);
});

//Sign up route for learner
router.post("/registerLearner", async (req, res) => {
  console.log("Register");
  const { error } = validateLearnerAccount(req.body);
  if (error) return res.status(400).send(error.message);

  let learner = await Learner.findOne({ email: req.body.email }).lean();
  // console.log(learner);
  if (learner) return res.status(400).send("Account already exists.");

  learner = new Learner(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  learner.password = await bcrypt.hash(learner.password, salt);
  learner.authType = "signUp";
  await learner.save();

  res.send("Account Created");
});

//Sign up route for creator
router.post("/registerCreator", async (req, res) => {
  console.log("Register");
  const { error } = validatecreatorAccount(req.body);
  if (error) return res.status(400).send(error.message);

  let creator = await Creator.findOne({ email: req.body.email }).lean();
  
  if (creator) return res.status(400).send("Account already exists.");

  creator = new Creator(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  creator.password = await bcrypt.hash(creator.password, salt);
  creator.authType = "signUp";
  await creator.save();
  console.log(creator);

  res.send("Account Created");
});

//dashboard page later to implement
router.get("/dashboard", authentication, (req, res) => {
  if ((req.user.type = "learner")) res.send("Learner's Dashboard Page");
  else res.send("Creator's Dashboard Page");
});

router.get("/getUser/:id", (req, res, next) => {
  Learner.findById(req.params.id)
    .then(user => {
      res.json(user)
    }).catch(err => res.json(err));
})

module.exports = router;
