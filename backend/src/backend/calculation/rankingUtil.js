const Ranking = require('../model/ranking');
const moment = require('moment');

function findRanking(date) {
    return new Promise(resolve => {
        Ranking.findOne({"date" : {"$lt" : date.toDate()}}, function (error, ranking) {
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