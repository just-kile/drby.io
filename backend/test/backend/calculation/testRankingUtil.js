/**
 * Created by thomas on 16.04.17.
 */

const moment = require('moment');

const rankingUtil = require('../../../src/backend/calculation/rankingUtil');
const Ranking = require('../../../src/backend/model/ranking');
const mongoDbSetup = require('../mongoDbSetup');

describe('Ranking Util', function () {

    mongoDbSetup();

    let date1 = moment('2017-01-31');
    let date2 = moment('2017-02-28');
    let date3 = moment('2017-03-31');

    function createRanking(date) {
        return {
            date: date.toDate()
        };
    }

    beforeEach(function (done) {
        Ranking.create(createRanking(date1), createRanking(date2), createRanking(date3), function () {
            done();
        });
    });

    it("should return ran", function (done) {
        // gameUtil.findGames(unknownLeague, startDate, endDate).then(games => {
        //     expect(games).toEqual([]);
        //     done();
        // })
        done();
    });


});

