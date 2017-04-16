var cheerio = require('cheerio');
var moment = require('moment');

function extractFirstNumber(str) {
    const numberRegExp = /\d+/i;
    return Number(numberRegExp.exec(str)[0]);
}


/**
 * Parse a single row of the bouts page of flattrackstats
 * @param {CheerioStatic} $ DOM of game page 
 * @param {CheerioElement} gameRow Row element to parse
 * @return {Object} The parsed game
 */
function parseGameRow($, gameRow) {
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
    return game;
}

/**
 * Parses a bouts page of flattrackstats. 
 * @param {string} html
 * @return {Object[]} Array of parsed games
 */
function parseGamePage(html) {
    let $ = cheerio.load(html, {
        normalizeWhitespace: true,
        xmlMode: true
    });
    let games = [];
    $('.view-content table tbody tr').each((idx, gameRow) => {
        games.push(parseGameRow($, gameRow));
    });
    return games;
}

module.exports = {
    parseGamePage
}