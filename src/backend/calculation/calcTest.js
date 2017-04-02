/**
 * Created by thomas on 30.03.17.
 */


const bouts = require('../../../examples/bouts.json');
const rankings = require('../../../examples/rankings.json');
const gamePoints = require('./gamePoints.js');
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
        let opponentRanking = findOpponent(opponentName, boutDate);

        let decaySplit = new Date(2016, 9, 1);
        var decayFactor = 1;

        if (boutDate.getTime() < decaySplit.getTime()) {
            decayFactor = 0.5;
            countOldest++;
        } else {
            countNewest++;
        }

        let strengh = opponentRanking ? opponentRanking.weight : 0.5;

        if (!opponentRanking) {
            // console.log("MISSING TEAM " + opponentName);
        }

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