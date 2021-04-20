const mongoose = require("mongoose");

module.exports = function () {
  //fixing all deprecationWarning of mongoDB
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useUnifiedTopology", true);

  function connectWithRetry() {
    //production - mongoose.connect(`mongodb://172.31.12.35:20000/ungrezi?authSource=admin`, {user:'BackendService',pass:'jdowiw#jdsoi@!zjfwpir',useNewUrlParser:true}).then(() => {
    // mongoose.connect('mongodb://localhost/ungrezi').then(() => {

    //for english speakers - questions database
    mongoose
      .connect(
        "mongodb://Ungrezi:ungrezIzergnU@139.59.247.122:20000/test?authSource=test&authMechanism=SCRAM-SHA-256&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
        { dbName: "ungrezi", useNewUrlParser: true }
      )
      .then(() => {
        console.log("connected to mongo");
      })
      .catch((err) => {
        console.log("Error connecting to mongo", err);
        setTimeout(connectWithRetry, 5000);
      });
  }
  connectWithRetry();
};
