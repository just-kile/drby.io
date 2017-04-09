/**
 * Created by thomas on 30.03.17.
 */

const gamePoints = 3

function calculateWinLossFactor({teamPoints, opponentPoints}) {
    if (teamPoints === 0 && teamPoints === 0) {
        return 0;
    }
    return (teamPoints / (teamPoints + opponentPoints)) * gamePoints;
}

function calculateGamePoints({teamPoints, opponentPoints, opponentStrength, decayFactor}) {
    return calculateWinLossFactor({teamPoints, opponentPoints}) * opponentStrength * decayFactor * 100;
}

function calculateWeightedGamePoints({gameCountInOldest6Months, gameCountInNewest6Months}) {
    return gameCountInOldest6Months * 0.5 + gameCountInNewest6Months
}

module.exports = {
    calculateWinLossFactor,
    calculateGamePoints,
    calculateWeightedGamePoints
};