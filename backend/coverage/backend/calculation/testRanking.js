var rankings = require('../../../src/backend/calculation/ranking');

describe("Ranking Calculation", function () {

    function createTeam(name, score, weight) {
        if (weight) {
            return {
                name, score, weight
            }
        }

        return {
            name, score
        }

    }

    describe("Strength Factor", function () {

        // Note: The math below is how WFTDA claims to calculate the weight. However, if you do this calculation
        // for an official WFTDA ranking, you will get slightly different results :-(

        it("should return an empty array when giving an empty array", function () {
            expect(rankings.calculateStrengthFactors([])).toEqual([]);
        });

        it("should return a single team with strength 1 giving a single team", function () {
            expect(rankings.calculateStrengthFactors([
                createTeam("MyTeam", 100)
            ]))
                .toEqual([
                    createTeam("MyTeam", 100, 1)
                ]);
        });

        it("should use the correct median for an odd amount of teams", function () {

            expect(rankings.calculateStrengthFactors([
                createTeam("MyTeam1", 300),
                createTeam("MyTeam2", 100),
                createTeam("MyTeam3", 75)
            ]))
                .toEqual([
                    createTeam("MyTeam1", 300, 300 / 100),
                    createTeam("MyTeam2", 100, 100 / 100),
                    createTeam("MyTeam3", 75, 75 / 100)
                ]);


        });

        it("should use the correct median for an even amount of teams", function () {

            expect(rankings.calculateStrengthFactors([
                createTeam("MyTeam1", 300),
                createTeam("MyTeam2", 110),
                createTeam("MyTeam3", 90),
                createTeam("MyTeam4", 75),
            ]))
                .toEqual([
                    createTeam("MyTeam1", 300, 300 / 100),
                    createTeam("MyTeam2", 110, 110 / 100),
                    createTeam("MyTeam3", 90, 90 / 100),
                    createTeam("MyTeam4", 75, 75 / 100)
                ]);


        });

        it("should have a minimum weight of 0.5 for each team", function () {

            expect(rankings.calculateStrengthFactors([
                createTeam("MyTeam1", 300),
                createTeam("MyTeam2", 100),
                createTeam("MyTeam3", 10)
            ]))
                .toEqual([
                    createTeam("MyTeam1", 300, 300 / 100),
                    createTeam("MyTeam2", 100, 100 / 100),
                    createTeam("MyTeam3", 10, 0.5)
                ]);


        });

    });

    describe("Sort Ranking", function () {

        it("should return an empty array if passed an empty array", function () {
            expect(rankings.sortRanking([])).toEqual([]);
        });

        it("should sort the ranking by its score", function () {
            expect(rankings.sortRanking([
                createTeam("MyTeam4", 120),
                createTeam("MyTeam1", 300),
                createTeam("MyTeam7", 70),
                createTeam("MyTeam3", 180),
                createTeam("MyTeam2", 200),
                createTeam("MyTeam6", 94),
                createTeam("MyTeam5", 95),
            ])).toEqual([
                createTeam("MyTeam1", 300),
                createTeam("MyTeam2", 200),
                createTeam("MyTeam3", 180),
                createTeam("MyTeam4", 120),
                createTeam("MyTeam5", 95),
                createTeam("MyTeam6", 94),
                createTeam("MyTeam7", 70)
            ]);
        });

    });



});
