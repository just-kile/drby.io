/**
 * Created by thomas on 15.04.17.
 */

const gameUtil = require('../../../src/backend/calculation/gameUtil');
const moment = require('moment');

var mongoose = require('mongoose');
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);

var Cat = mongoose.model('Cat', {
    name: String
});

var Game = require('../../../src/backend/model/game');



describe('Game Util', function() {

    beforeAll(function(done) {
        mockgoose.prepareStorage().then(function() {
            mongoose.connect('mongodb://127.0.0.1:27017/TestingDB', function(err) {
                done(err);
            });
        });
    });

    beforeEach(function(done) {
        mockgoose.helper.reset().then(function() {
            done();
        });
    });


    describe("Single Game", function() {

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

        beforeEach(function(done) {
            Game.create(game, function () {
                done();
            });
        });

        it("should return an empty array for unkown league", function(done) {
            gameUtil.findGames(unknownLeague, startDate, endDate).then(games => {
                expect(games).toEqual([]);
                done();
            })
        });

        it("should return the game for given home league", function(done) {
            gameUtil.findGames(homeLeague, startDate, endDate).then(games => {
                expect(games).toEqual([{
                    league: homeLeague,
                    opponentLeague: awayLeague,
                    score: homeScore,
                    opponentScore: awayScore,
                    date: date
                }]);
                done();
            })
        });

        it("should return the game for given away league", function(done) {
            gameUtil.findGames(awayLeague, startDate, endDate).then(games => {
                expect(games).toEqual([{
                    league: awayLeague,
                    opponentLeague: homeLeague,
                    score: awayScore,
                    opponentScore: homeScore,
                    date: date
                }]);
                done();
            })
        });


    });

});


//
// describe("Game Util", function () {
//
//     beforeEach(function(done) {
//         mockgoose.prepareStorage().then(function() {
//             mongoose.connect('mongodb://example.com/TestingDB', function(err) {
//                 done(err);
//             });
//         });
//     });
//
//     describe("Find Games", function () {
//
//         let fromDate = moment('2016-02-01');
//         let toDate = moment('2017-01-31');
//
//         it('should return an empty array for an unkown team', function () {
//             let unknownLeague = "Ghostery Roller Derby";
//
//             gameUtil.findGames(unknownLeague, fromDate, toDate).then(games => {
//                 expect(games).toEqual([]);
//                 done();
//             });
//         });
//
//         it('should return an empty array for an unkown team 22', function () {
//             let unknownLeague = "Ghostery Roller Derby";
//
//             gameUtil.findGames(unknownLeague, fromDate, toDate).then(games => {
//                 expect(games).toEqual([]);
//                 done();
//             });
//         });
//
//         describe("Single game as home team", function () {
//
//             let league = "Bear City Roller Derby";
//             let opponentLeague = "Brewcity Bruisers";
//             let score = 201;
//             let opponentScore = 197;
//
//             let game = new Game({
//                 date: moment('2016-06-09').toDate(),
//                 home: {
//                     league: league,
//                     score: score
//                 },
//                 away: {
//                     league: opponentLeague,
//                     score: opponentScore
//                 }
//             });
//
//             beforeEach(function (done) {
//                 jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
//
//                 console.log('before... ' + mockgoose.helper.isMocked());
//
//                 Game.create(game, function (error, theGame) {
//                     console.log('did create game ' + theGame)
//                     done(error);
//                 })
//             });
//
//             it('should return single game as home team', function (done) {
//
//                 let games = Game.find();
//                 games.exec(function(error, games) {
//                     console.log(error);
//                     console.log(games);
//                 })
//                 // const expectedGames = [{
//                 //     league,
//                 //     opponentLeague,
//                 //     score,
//                 //     opponentScore
//                 // }];
//                 //
//                 // gameUtil.findGames(league, fromDate, toDate).then(games => {
//                 //     console.log("Foooo");
//                 //     expect(games).toEqual(expectedGames);
//                 //     done();
//                 // });
//
//             });
//
//
//         });
//
//     });
//
// });