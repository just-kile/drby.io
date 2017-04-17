const Ranking = require('../model/ranking');
const moment = require('moment');

function findRanking(date) {
    return new Promise(resolve => {
        Ranking
            .findOne({"date": {"$lt": date.toDate()}})
            .sort({date: -1})
            .exec(function (error, ranking) {
                if (!ranking) {
                    resolve();
                } else {
                    resolve({
                        date: moment(ranking.date),
                        leagues: ranking.leagues
                    });
                }
            });

    })
}

function findWeight(league, date) {
    return new Promise(resolve => {
        findRanking(date).then(ranking => {
            if (ranking) {
                let rankedLeague = ranking.leagues.find(l => l.league === league);
                if (rankedLeague) {
                    resolve(rankedLeague.weight);
                } else {
                    resolve(1.0);
                }
            } else {
                resolve(1.0);
            }
        });

    })
};

module.exports = {
    findRanking,
    findWeight
};