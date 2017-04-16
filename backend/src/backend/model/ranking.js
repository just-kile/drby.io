var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ranking = mongoose.model('Ranking', new Schema({
    date: Date,
    leagues: [
        {
            league: String,
            wins: Number,
            losses: Number,
            points: Number,
            weight: Number
        }
    ]
}));

module.exports = Ranking;