'use strict';

// Import dependencies
var request = require('request-promise-native');
var cheerio = require('cheerio');
var moment = require('moment');

console.log('Grabber starts here');

function extractFirstNumber(str) {
    const numberRegExp = /\d+/i;
    return Number(numberRegExp.exec(str)[0]);
}

/**
 * Grabs all games from Flat Track stats.
 * @param {number} page 
 * @return {Promise}
 */
function grabGames(page) {
    let gamesURL = `http://flattrackstats.com/bouts/wftda?page=${page}`;
    return request(gamesURL).then(html => {
        const scoreRegExp = /\d+/i;
        const teamIdRegExp = /\d+/i;

        let $ = cheerio.load(html, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        let games = [];
        $('.view-content table tbody tr').each((idx, gameRow) => {
            let game = {};
            let dataElements = $('td', gameRow).toArray();

            let date = dataElements[0].lastChild.data.trim();
            game.date = moment(date, 'MM/DD/YY');
            game.homeId = extractFirstNumber($('a', dataElements[2]).first().attr('href'));
            game.homeTeam = $('a', dataElements[2]).first().text();
            game.homeScore = extractFirstNumber($(dataElements[3]).html());
            game.awayId = extractFirstNumber($('a', dataElements[4]).first().attr('href'));
            game.awayTeam = $('a', dataElements[4]).first().text();
            game.awayScore = extractFirstNumber($(dataElements[5]).html());
            game.gameId = extractFirstNumber($(dataElements[8]).html());
            games.push(game);
        });
        return games;
    })
}

grabGames('0').then(games => { console.log(games); })