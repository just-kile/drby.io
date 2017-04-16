'use strict';

// Import dependencies
var request = require('request-promise-native');
var ftsGameParser = require('./ftsGameParser');

console.log('Grabber starts here');

/**
 * Grabs all games from Flat Track stats.
 * @param {number} page 
 * @return {Promise}
 */
function grabGames(page) {
    let gamesURL = `http://flattrackstats.com/bouts/wftda?page=${page}`;
    return request(gamesURL).then(html => {
        return ftsGameParser.parseGamePage(html);
    })
}

//grabGames('0').then(games => { console.log(games); })

module.exports = {
    grabGames
}