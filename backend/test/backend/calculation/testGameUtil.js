/**
 * Created by thomas on 15.04.17.
 */

var Games = require('../../../src/backend/model/game');
var gameUtil = require('../../../src/backend/calculation/gameUtil');
var moment = require('moment');

describe("Game Util", function () {

    describe("Find Games", function () {

        let fromDate = moment('2016-02-01');
        let toDate = moment('2017-01-31');

        it('should return an empty array for an unkown team', function () {
            let unknownLeague = "Ghostery Roller Derby";
            expect(gameUtil.findGames(unknownLeague, fromDate, toDate)).toEqual([]);
        });

        it('should return all games for the given league', function () {
            let league = "Bear City Roller Derby";



        });

    });

});