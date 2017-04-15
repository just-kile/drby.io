var express = require('express');
var router = express.Router();

var mockData = require('./../../calculation/rankingCalculator').calculateRanking();

/**
 * API-Calls for: http://<API-PATH>:<PORT>/api/v1/drivers
 */
router.route('/')
    .get(getRouteHandler);


function getRouteHandler(req, res) {

        res.status(200).json(
            mockData.ranking
        )
}

module.exports = router;
