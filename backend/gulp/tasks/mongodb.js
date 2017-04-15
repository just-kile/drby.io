/**
 * Created by thomas on 13.03.16.
 */

const gulp = require('gulp');
const Mongoose = require('mongoose').Mongoose;
const mongoose = new Mongoose();
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

gulp.task('mongodb:start', function(done) {

    mockgoose.prepareStorage().then(function() {
        mongoose.connect('mongodb://example.com/TestDb', function(err) {
            done(err);
        });
    });

    gulp.on('mongodb-stop', function() {
        mongoose.connection.close(function() {
            // FIXME: If anybody knows how to avoid that, I'd be very happy.
            process.exit();
        })
    });

});