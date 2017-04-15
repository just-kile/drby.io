var mongoose = require('mongoose');

var gamesSchema = new mongoose.Schema({
    ftsGameId: Number
    // date: date,
    // home: {
    //     league: String,
    //     score: Number
    // },
    // away: {
    //     league: String,
    //
    // }
});

var Games =  mongoose.model('games', gamesSchema);

module.exports = Games;