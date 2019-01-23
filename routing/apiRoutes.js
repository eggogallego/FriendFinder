let friends = require("../data/friends");
module.exports = (app) => {
    app.get("/api/friends", (req, res) => {
        res.json(friends);
    });
    app.post('/api/friends', (req, res) => {
        let difference = 40;
        let matchName = '';
        let matchPhoto = '';

        friends.forEach((friend) => {
            let matchedScoresArray = [];
            let totalDifference = 40;
            function add(total, num) {
                return total + num;
            }
            for (let i = 0; i < friend.scores.length; i++) {
                matchedScoresArray.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(friend.scores[i])));

            }
            totalDifference = matchedScoresArray.reduce(add, 0);
            if (totalDifference < difference) {
                difference = totalDifference;
                matchName = friend.name;
                matchPhoto = friend.photo;
            }
        });
        res.json({
            name: matchName,
            photo: matchPhoto
        });
        friends.push(req.body);
    });
};