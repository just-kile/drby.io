/**
 * Created by thomas on 13.03.16.
 */

var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

// add frontend when existing...
gulp.task('unit', ['unit:backend']);

gulp.task('unit:backend', function () {
    return gulp.src('test/backend/**/*.js')
        .pipe(jasmine({verbose: true}))
        .pipe(gulp.dest('coverage/backend'))
});

gulp.task('unit:frontend', function (done) {
    var Server = require('karma').Server;
    new Server({
        configFile: __dirname + '/../../karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('unit:watch', function () {
    gulp.watch(['test/**/*.js', 'src/**/*.js'], ['unit']);
});