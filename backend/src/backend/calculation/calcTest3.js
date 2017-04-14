/**
 * Created by thomas on 30.03.17.
 */


const bouts = require('../../../../examples/bouts.json');
const rankings = require('../../../../examples/rankings.json');
const gamePoints = require('./gamePoints.js');
const moment = require('moment');
let teamMappings = require('./teamMappings.json');

const bcrd = "Bear City Roller Derby";



var count = 0;

function findBouts(team, from, to) {
    return bouts.filter(function (bout) {
        let isCorrectTeam = bout.homeTeam === team || bout.awayTeam === team;
        let boutDate = new Date(bout.date.$date);
        let isCorrectDate = boutDate.getTime() >= from.getTime() && boutDate.getTime() <= to.getTime();
        return isCorrectTeam && isCorrectDate;
    })
};

function findRanking(date) {
    return rankings.find(ranking => {
        return new Date(ranking.date.$date).getTime() < date.getTime()
    });
}

function findOpponent(teamName, date) {
    let ranking = findRanking(date);

    var team = ranking.team.find(
        team => {
            return team.name === teamName
        }
    );

    if (team) {
        team['ranking'] = ranking;
    } else {
        let override = teamMappings.find(mapping => {
                return mapping.from === teamName
            }
        );
        if (override) {
            return findOpponent(override.to, date);
        }
    }

    return team;
}

function calcAverageRankingPoints(teamName, fromDate, toDate) {
    var countNewest = 0;
    var countOldest = 0;
    var totalPoints = 0;

    findBouts(teamName, fromDate, toDate).forEach(bout => {

        let isHome = bout.homeTeam === teamName;
        var opponentName, teamPoints, opponentPoints;
        if (isHome) {
            opponentName = bout.awayTeam;
            teamPoints = bout.homeScore;
            opponentPoints = bout.awayScore;
        } else {
            opponentName = bout.homeTeam;
            teamPoints = bout.awayScore;
            opponentPoints = bout.homeScore;
        }

        let boutDate = new Date(bout.date.$date);


        let decaySplit = new Date(2016, 9, 1);
        var decayFactor = 1;

        if (boutDate.getTime() < decaySplit.getTime()) {
            decayFactor = 0.5;
            countOldest++;
        } else {
            countNewest++;
        }

        var retries = 5;
        var rankingDate = boutDate;
        var opponentRanking = findOpponent(opponentName, boutDate);

        // this is actually a approximation to get a better educated guess of the strengh factor
        // of a team though it is NOT yet ranked.
        // Seems to increase ranking point accuracy by about 0.2 percent.
        while (!opponentRanking && retries > 0) {
            rankingDate = moment(rankingDate).add(1, 'months').toDate();
            opponentRanking = findOpponent(opponentName, rankingDate);
            retries--;
        }

        if (!opponentRanking) {
            // console.log("MISSING TEAM " + opponentName + " for team " + teamName + " on " + boutDate);
        }

        let strengh = opponentRanking ? opponentRanking.weight : 0.5

        var points = gamePoints.calculateGamePoints({
            teamPoints, opponentPoints, opponentStrength: strengh, decayFactor
        })

        // console.log("vs " + opponentName + ": " + points);
        // console.log("    > bout date: " + boutDate);
        // console.log("    > ranking date: " + new Date(opponentRanking.ranking.date.$date));
        // console.log("    > opponent weight: " + opponentRanking.weight);
        // console.log("    > team points: " + teamPoints);
        // console.log("    > opponent points: " + opponentPoints);
        // console.log("    > points " + points)
        totalPoints += points;
    });

    let weightedGamePoints = gamePoints.calculateWeightedGamePoints({
        gameCountInOldest6Months: countOldest,
        gameCountInNewest6Months: countNewest
    });

    let points = totalPoints / weightedGamePoints;

    // console.log("total games: " + (countNewest + countOldest));

    if(!points) {
        let override = teamMappings.find(mapping => {
                return mapping.to === teamName
            }
        );
        if (override) {
            return calcAverageRankingPoints(override.from, fromDate, toDate);
        }
    }
    return points;
}

rankings[0].team.forEach(team => {

    let teamName = team.name;
    let caluclatedAverage = calcAverageRankingPoints(team.name, new Date(2016, 2, 1), new Date(2017, 1, 28));
    let wftdaAverage = team.score;
    let absoluteDifference = Math.abs(caluclatedAverage - wftdaAverage);
    let relativeDifference = absoluteDifference / wftdaAverage * 100;

    // console.log(teamName + ' - ' + caluclatedAverage + ' (WFTDA: ' + wftdaAverage + ', abs. diff: ' + absoluteDifference + ', rel. diff: ' + relativeDifference + '%)' )

});

//
// let teamName = "Detroit Roller Derby";
// let caluclatedAverage = calcAverageRankingPoints(teamName, new Date(2016, 2, 1), new Date(2017, 1, 28));
// console.log(caluclatedAverage)

module.exports = calcAverageRankingPoints;