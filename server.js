// Start the dependencies
const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bodyParser = require("body-parser");
const path = require("path");

// Start the default port, plug in the promise from the Promises Library, seems most popular one is bluebird in the mongoose docs
const PORT = process.env.PORT || 3001;
mongoose.Promise = bluebird;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets if in production (running on Heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("/build"));
} else {
  app.use(express.static(__dirname + "/public"));
}

// Set up the routes, including the api [I don't think I have these set correctly - nothing shows up?]
var articlesController = require("./src/controllers/article-controller");
var router = new express.Router();

router.get("/api/saved", articlesController.find);
router.post("/api/saved", articlesController.insert);
router.delete("/api/saved/:id", articlesController.delete);
router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html")); // This doesn't look right but can't find an example
});

app.use(router);

// Linking the database to mongoose
const db = process.env.MONGODB_URI || "mongodb://localhost/nyt-react-app";
mongoose.connect(db, function(error) {
  
  if (error) {
    console.error(error);
  }
  else {
    console.log("connected");
  }
});

// Set listen to port
app.listen(PORT, function() {
  console.log(`🌎 ==> Server listening on port ${PORT}!`);
});