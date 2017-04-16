const Game = require('../../../src/backend/model/game');

function toGameResult(league, game) {
    return game => {
        let isHomeLeague = game.home.league === league;
        if (isHomeLeague) {
            return {
                league,
                opponentLeague: game.away.league,
                score: game.home.score,
                opponentScore: game.away.score,
                date: game.date
            }
        } else {
            return {
                league,
                opponentLeague: game.home.league,
                score: game.away.score,
                opponentScore: game.home.score,
                date: game.date
            }
        }
    }
}

function findGames(league, from, to) {
    return new Promise(function (resolve) {
        Game.find({"$or": [{"home.league": league}, {"away.league": league}]}, function (error, games) {
            resolve(games.map(toGameResult(league)));
        });
    });
}

module.exports = {

    findGames

};