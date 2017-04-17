/**
 * Created by thomas on 16.04.17.
 */

const moment = require('moment');

const rankingUtil = require('../../../src/backend/calculation/rankingUtil');
const Ranking = require('../../../src/backend/model/ranking');
const mongoDbSetup = require('../mongoDbSetup');

describe('Ranking Util', function () {

    mongoDbSetup();

    describe('Find Ranking', function () {

        describe('By date', function () {

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
            });

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

        describe("Ranking contains leagues", function () {

            let date = moment('2016-12-31')
            let leagues = [
                {
                    league: 'Victorian Roller Derby League',
                    wins: 9,
                    losses: 1,
                    points: 1035.10,
                    weight: 7.39
                },
                {
                    league: 'Gotham Girls Roller Derby',
                    wins: 10,
                    losses: 1,
                    points: 1027.18,
                    weight: 7.33
                },
                {
                    league: 'Rose City Rollers',
                    wins: 13,
                    losses: 1,
                    points: 944.85,
                    weight: 6.75
                }
            ];

            let ranking =
                {
                    date: date.toDate(),
                    leagues: leagues
                };

            beforeEach(function (done) {
                Ranking.create(ranking, function () {
                    done();
                });
            });

            it('Returns all leagues of the ranking', function (done) {
                rankingUtil.findRanking(moment('2017-01-01')).then(ranking => {
                    expect(ranking.leagues.length).toEqual(leagues.length);
                    for (i = 0; i < ranking.leagues.length; i++) {
                        expect(ranking.leagues[i]).toEqual(jasmine.objectContaining(leagues[i]));
                    }
                    done();
                })
            });

        });
    });

    describe("Find Weight", function () {

        let league1 = "Bear City Roller Derby";
        let weight1_1 = 2.53;
        let weight1_2 = 2.56;
        let weight1_3 = 2.41;
        
        let date1 = moment('2017-01-31');
        let date2 = moment('2017-02-28');
        let date3 = moment('2017-03-31');


        let rankings = [
            {
                date: date1,
                leagues: [
                    {
                        league1,
                        weight: weight1_1
                    }
                ]
            },
            {
                date: date2,
                leagues: [
                    {
                        league1,
                        weight: weight1_2
                    }
                ]
            },
            {
                date: date3,
                leagues: [
                    {
                        league1,
                        weight: weight1_3
                    }
                ]
            }
        ];

        beforeEach(function (done) {
            Ranking.create(rankings, function () {
                done();
            });
        });


        it("Should return the weight of the relevant ranking for the league1 in february", function (done) {
            rankingUtil.findWeight(league1, moment('2017-03-14')).then(weight => {
                expect(weight).toEqual(weight1_2);
                done();
            })
        })

        it("Should return the weight of the relevant ranking for the league1 in march", function (done) {
            rankingUtil.findWeight(league1, moment('2017-04-02')).then(weight => {
                expect(weight).toEqual(weight1_3);
                done();
            })
        })

    });

});

