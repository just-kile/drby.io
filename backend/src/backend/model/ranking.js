var mongoose = require('mongoose');

var rankingsSchema = new mongoose.Schema({

    date: date,
    leagues: [
        {
            league: String,
            wins: Number,
            losses: Number,
            points: Number,
            weight: Number
        }
    ]

});

var Rankings = mongoose.model('rankings', rankingsSchema);

module.exports = Rankings;