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
                        date: moment(ranking.date)
                    });
                }
            });

    })
}

module.exports = {
    findRanking
};