var mongoose = require('mongoose');

var gamesSchema = new mongoose.Schema({

    date: date,
    ftsGameId: Number,
    home: {
        league: String,
        score: Number
    },
    away: {
        league: String,
        score: Number
    }

});

var Games =  mongoose.model('games', gamesSchema);

module.exports = Games;