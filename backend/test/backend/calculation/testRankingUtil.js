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

    it("should return undefined for date before first ranking.", function (done) {
        rankingUtil.findRanking(moment('2017-01-30')).then(ranking => {
            expect(ranking).toEqual(undefined);
            done();
        })
    });

    it("should return the january ranking for the last february", function (done) {
        rankingUtil.findRanking(date2).then(ranking => {
            expect(ranking.date.valueOf()).toEqual(date1.valueOf());
            done();
        })
    })

    // The next test is executed multipe times to ensure ordering is performed properly. When running,
    // the test just once, we may be lucky to hit the right result just out of luck (e. g. mongo db
    // used some ordering by surprise although not required to)
    let times = 10;
    for (var i = 0; i < times; ++i) {
        it(`should return the february ranking for the some day in march (run ${i})`, function (done) {
            rankingUtil.findRanking(moment('2017-03-09')).then(ranking => {
                expect(ranking.date.valueOf()).toEqual(date2.valueOf());
                done();
            })
        })
    }

    it("should return the march ranking even if requested date is in far future", function (done) {
        rankingUtil.findRanking(moment('2018-07-12')).then(ranking => {
            expect(ranking.date.valueOf()).toEqual(date3.valueOf());
            done();
        })
    })

});

