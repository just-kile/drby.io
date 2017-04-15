var express = require('express');
var router = express.Router();

// use API-Versioning
router.use('/api/v1', require('./v1'));

module.exports = router;