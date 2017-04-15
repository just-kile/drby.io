'use strict';

// Import dependencies
const express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();



// this is needed to interpret x-www-form-urlencoded POST-requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));


// map routes defined in
app.use('/', require('./src/backend/api'));


app.listen(3000, function () {
    console.log('drby.io api listening on port 3000!');
    console.log('navigate to http://localhost:3000/api/v1/getCurrentRanking for a PoC!')
});
