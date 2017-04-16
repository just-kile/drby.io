const Game = require('../../../src/backend/model/game');

function findGames(league, from, to) {
    return new Promise(function (resolve) {
        Game.find({"home.league": league}, function (error, games) {
            console.log(games);
            resolve(games.map(game => {
                return {
                    league,
                    opponentLeague: game.away.league,
                    score: game.home.score,
                    opponentScore: game.away.score,
                    date: game.date
                }
            }));
        });
    });
}

module.exports = {

    findGames

};