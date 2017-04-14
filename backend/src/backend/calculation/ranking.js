/**
 * Created by thomas on 14.04.17.
 */

function calculateMedianScore(ranking) {
    var isEven = ranking.length % 2 == 0;

    if (isEven && ranking.length > 1) {
        let index = Math.trunc(ranking.length / 2) - 1;
        let team1 = ranking[index];
        let team2 = ranking[index + 1];
        return (team1.score + team2.score) / 2;
    } else if (ranking.length > 0) {
        let team = ranking[Math.trunc(ranking.length / 2)];
        return team.score
    }
}

function calculateWeight(score, medianScore) {
    var weight = score / medianScore;
    if (weight < 0.5) {
        weight = 0.5;
    }
    return weight;
}

function calculateStrengthFactors(ranking) {
    var result = [];
    var medianScore = calculateMedianScore(ranking);

    ranking.forEach(team => {
        result.push(
            {
                name: team.name,
                score: team.score,
                weight: calculateWeight(team.score, medianScore)
            }
        )
    });

    return result;
}

function sortRanking(teams) {
    return teams.sort(function (team1, team2) {
        return team2.score - team1.score;
    })
}

module.exports = {
    calculateStrengthFactors,
    sortRanking
};