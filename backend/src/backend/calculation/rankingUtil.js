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
            resolve(ranking.leagues[0].weight);
        });

    })
};

module.exports = {
    findRanking,
    findWeight
};