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

module.exports = {
    calculateWinLossFactor,
    calculateGamePoints
};