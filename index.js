const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const OpenTok = require("opentok");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
// require('events').EventEmitter.defaultMaxListeners = 15;

const auth = require("./routes/auth");
const blog = require("./routes/blog");
const question = require("./routes/questions");

const lang1 = require("./routes/incub/englishspeak");
const lang2 = require("./routes/incub/hindispeak");

const topic1 = require("./routes/incub/course/english");
const topic2 = require("./routes/incub/course/hindi");

const posts = require("./routes/posts");

const live_session = require("./routes/liveSession");

const storylang1 = require("./routes/stories/englishListeners"); //for english domain stories
const storylang2 = require("./routes/stories/hindiListeners"); //for hindi domain stories

const userInfo1 = require("./routes/userInfo/EnglishUserInfoSub"); // for english domain users info
const userInfo2 = require("./routes/userInfo/HindiUserInfoSub"); // for hindi domain users info

const editInfo = require("./routes/userInfo/editInfo"); // for changing user settings

const notes1 = require("./routes/notes");

const challenge = require("./routes/challenge"); //for getting names in challengePage

const stats = require("./routes/statistics"); //for getting Top6 learners in LEARN Page

require("./startup/db")();

app.use(cors()); //url of react app

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use("/", auth);
app.use("/blog", blog);
// app.use("/question", question);

app.use("/incubator", lang1);
app.use("/incubator", lang2);

app.use("/incubator", topic1);
app.use("/incubator", topic2);

app.use("/forum", posts);
app.use("/stories", storylang1); //english domain stories
app.use("/stories", storylang2); //Hindi domain stories

app.use("/info", userInfo1); //for english domain users information
app.use("/info", userInfo2); //for hindi domain users information

app.use("/info", editInfo); //for changing user settings

app.use("/notes", notes1);

app.use("/challenge", challenge); //for getting names in challengePage

app.use("/stats", stats); //for getting Top6 learners in LEARN Page

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname + '/public/demo/home.html'));
// });

app.listen(process.env.PORT || 5000, () => console.log("Port 5000"));
