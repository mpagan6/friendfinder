//needs to have a get to /survey and post route

//home.html is the default

var express = require("express");
var path = require("path");
var router = express.Router();

// define the home page route
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/home.html"));
    console.log(__dirname);

});

// define the survey route
router.get('/survey', function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/survey.html"));
});

module.exports = router;

