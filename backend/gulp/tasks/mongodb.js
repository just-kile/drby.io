/**
 * Created by thomas on 13.03.16.
 */

var gulp = require('gulp');
var mongoose = require('mongoose');
// var Mockgoose = require('mockgoose').Mockgoose;
// var mockgoose = new Mockgoose(mongoose);

gulp.task('mongodb:start', function(done) {
    mongoose.Promise = global.Promise;

    gulp.on('mongodb-stop', function() {
        process.exit();
    });

    done();
});