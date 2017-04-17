/**
 * Created by thomas on 15.04.17.
 */

const moment = require('moment');

const gameUtil = require('../../../src/backend/calculation/gameUtil');
const Game = require('../../../src/backend/model/game');
const mongoDbSetup = require('../mongoDbSetup');

describe('Game Util', function () {
    mongoDbSetup();

    describe("Single Game", function () {

        let date = moment('2016-09-23').toDate();
        let unknownLeague = 'I am unknown';
        let homeLeague = 'Graveyard Queens';
        let homeScore = 210;
        let awayLeague = 'Munich Rolling Rebels';
        let awayScore = 192;
        let startDate = moment('2016-02-01');
        let endDate = moment('2017-01-31');

        let game = {
            ftsGameId: 1,
            date: date,
            home: {
                league: homeLeague,
                score: homeScore
            },
            away: {
                league: awayLeague,
                score: awayScore
            }
        };

        beforeEach(function (done) {
            Game.create(game, function () {
                done();
            });
        });

        it("should return an empty array for unkown league", function (done) {
            gameUtil.findGames(unknownLeague, startDate, endDate).then(games => {
                expect(games).toEqual([]);
                done();
            })
        });

        it("should return the game for given home league", function (done) {
            gameUtil.findGames(homeLeague, startDate, endDate).then(games => {
                expect(games).toEqual([{
                    league: homeLeague,
                    opponentLeague: awayLeague,
                    score: homeScore,
                    opponentScore: awayScore,
                    date: moment(date)
                }]);
                done();
            })
        });

        it("should return the game for given away league", function (done) {
            gameUtil.findGames(awayLeague, startDate, endDate).then(games => {
                expect(games).toEqual([{
                    league: awayLeague,
                    opponentLeague: homeLeague,
                    score: awayScore,
                    opponentScore: homeScore,
                    date: moment(date)
                }]);
                done();
            })
        });

        it("should return no game if it was played too early", function (done) {
            gameUtil.findGames(homeLeague, moment('2016-10-01'), endDate).then(games => {
                expect(games).toEqual([]);
                done();
            })
        });

        it("should return no game if it was played too late", function (done) {
            gameUtil.findGames(homeLeague, startDate, moment('2016-09-01')).then(games => {
                expect(games).toEqual([]);
                done();
            })
        });


    });

    describe("Mutliple Games Game", function () {

        let date = moment('2016-09-23').toDate();
        let league = 'Graveyard Queens';
        let opponentLeague1 = 'Munich Rolling Rebels';
        let opponentLeague2 = 'Prussian Fat Cats';
        let opponentLeague3 = 'Riot Rocketz';
        let score1 = 210;
        let score2 = 182;
        let score3 = 193;
        let opponentScore1 = 174;
        let opponentScore2 = 271;
        let opponentScore3 = 154;
        let startDate = moment('2016-02-01');
        let endDate = moment('2017-01-31');

        let game1 = {
            date: date,
            home: {
                league: league,
                score: score1
            },
            away: {
                league: opponentLeague1,
                score: opponentScore1
            }
        };
        let game2 = {
            date: date,
            home: {
                league: opponentLeague2,
                score: opponentScore2
            },
            away: {
                league: league,
                score: score2
            }
        };
        let game3 = {
            date: date,
            home: {
                league: league,
                score: score3
            },
            away: {
                league: opponentLeague3,
                score: opponentScore3
            }
        };

        beforeEach(function (done) {
            Game.create(game1, game2, game3, function () {
                done();
            });
        });

        it("Returns all games", function (done) {
            gameUtil.findGames(league, startDate, endDate).then(games => {
                expect(games).toEqual([
                    {
                        league: league,
                        opponentLeague: opponentLeague1,
                        score: score1,
                        opponentScore: opponentScore1,
                        date: moment(date)
                    },
                    {
                        league: league,
                        opponentLeague: opponentLeague2,
                        score: score2,
                        opponentScore: opponentScore2,
                        date: moment(date)
                    }, {
                        league: league,
                        opponentLeague: opponentLeague3,
                        score: score3,
                        opponentScore: opponentScore3,
                        date: moment(date)
                    }
                ]);
                done();
            })
        })

    });

});
