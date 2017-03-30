/**
 * Created by thomas on 30.03.17.
 */


const bouts = require('../../../examples/bouts.json');
const rankings = require('../../../examples/rankings.json');
const gamePoints = require('./gamePoints.js');

const bcrd = "Bear City Roller Derby";
const ranking = rankings[0];

var count = 0;

bouts.forEach(function (bout) {

    if (count > 2) {
        return;
    }

    var opponent;
    var teamPoints;
    var opponentPoints;

    if (bout.homeTeam === bcrd) {
        opponent = bout.awayTeam;
        teamPoints = bout.homeScore;
        opponentPoints = bout.awayScore;

    } else if (bout.awayTeam === bcrd) {
        opponent = bout.homeTeam;
        teamPoints = bout.awayScore;
        opponentPoints = bout.homeScore;
    }

    if (opponent) {
        const opponentRanking = ranking.team.find(function (it) {
            return it.name === opponent
        });

        count++;

        console.log(teamPoints)
        var points = gamePoints.calculateGamePoints({teamPoints, opponentPoints, opponentStrength: opponentRanking.weight, decayFactor: 1});
        console.log('vs ' + opponent + ' we scored ' + points);
    }


});