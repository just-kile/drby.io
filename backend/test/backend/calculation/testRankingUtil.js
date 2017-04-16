/**
 * Created by thomas on 16.04.17.
 */

/**
 * Created by thomas on 15.04.17.
 */

const moment = require('moment');

const gameUtil = require('../../../src/backend/calculation/gameUtil');
const Game = require('../../../src/backend/model/game');
const mongoDbSetup = require('../mongoDbSetup');

describe('Ranking Util', function() {

    mongoDbSetup();

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




    });

});

