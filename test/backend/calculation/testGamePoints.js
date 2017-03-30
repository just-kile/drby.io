var gamePoints = require('../../../src/backend/calculation/gamePoints');

describe("Point Calculation", function () {

    describe("Win Loss Factor", function () {


        it("should be 0 when no team scores", function () {
            expect(gamePoints.calculateWinLossFactor({
                teamPoints: 0,
                opponentPoints: 0
            })).toEqual(0)
        });

        it("should be 0 when team does not score", function () {
            expect(gamePoints.calculateWinLossFactor({
                teamPoints: 0,
                opponentPoints: 1
            })).toEqual(0)
        });

        it("should be 3 when opponent does not score", function () {
            expect(gamePoints.calculateWinLossFactor({
                teamPoints: 3,
                opponentPoints: 0
            })).toEqual(3)
        });

        it("should be 1.5 when both team have same score", function () {
            expect(gamePoints.calculateWinLossFactor({
                teamPoints: 70,
                opponentPoints: 70
            })).toEqual(1.5)
        });

        it("should be 1 when opponent scores twice as much points", function () {
            expect(gamePoints.calculateWinLossFactor({
                teamPoints: 10,
                opponentPoints: 20
            })).toEqual(1)
        });

    });

    describe("Game Points", function () {

        it("should return 0 when team does not score", function () {
            expect(gamePoints.calculateGamePoints({
                teamPoints: 0,
                opponentPoints: 1,
                opponentStrength: 1,
                decayFactor: 1
            })).toEqual(0);
        });

        it("should return 600 when opponent does not score with strength 2", function () {
            expect(gamePoints.calculateGamePoints({
                teamPoints: 1,
                opponentPoints: 0,
                opponentStrength: 2,
                decayFactor: 1
            })).toEqual(600);
        });

        it("should return 150 when both teams score same with opponent strength 2 and decay factor 0.5", function () {
            expect(gamePoints.calculateGamePoints({
                teamPoints: 100,
                opponentPoints: 100,
                opponentStrength: 2,
                decayFactor: 0.5
            })).toEqual(150);
        });


        it("should return 25 when opponent team scores twice as much with opponent strength 2 and decay factor 0.5", function () {
            expect(gamePoints.calculateGamePoints({
                teamPoints: 100,
                opponentPoints: 200,
                opponentStrength: 0.5,
                decayFactor: 0.5
            })).toEqual(25);
        });


    });


});
