//A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
//A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

var express = require("express");
var path = require("path");
var router = express.Router();
var friendsList = require('../data/friends.js');

router.post('/data/friends', function(req, res) {
    let newSurvey = req.body;
    let pickedFriend;
    let friendCalc = [];
    for (var i = 0; i < friendsList.length; i++) {
        var totalDifference = 0;
        for (var k = 0; k < 10; k++) {
            let scoreDiff = Math.abs(friendsList[i].scores[k] - newSurvey.scores[k]);
            totalDifference += scoreDiff;
        }
        friendCalc.push({
            name: friendsList[i].name,
            picture: friendsList[i].picture,
            totalDiff: totalDifference
        });
    }
    let maxScore = 40;
    friendCalc.map(function(obj) {
        if (obj.totalDiff < maxScore) maxScore = obj.totalDiff;
    });
    pickedFriend = friendCalc.filter(function(e) { return e.totalDiff == maxScore; });

    res.json(pickedFriend);
    friendsList.push(newSurvey);

});

router.get('/data/friends', function(req, res) {
    res.json(friendsList);
});

module.exports = router;