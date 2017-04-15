var express = require('express');
var router = express.Router();

/**
 * implement open API-Calls here (no JWT-Token required)
 */
router.use('/getCurrentRanking', require('./getCurrentRanking'));


/**
 * implement authenticated API-Calls here (JWT-Token required)
 */


module.exports = router;