var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Game = mongoose.model('Game', new Schema({
    ftsGameId: Number,
    date: Date,
    home: {
        league: String,
        score: Number
    },
    away: {
        league: String,
        score: Number
    }
}));

module.exports = Game;