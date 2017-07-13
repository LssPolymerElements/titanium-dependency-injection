var gulp = require('gulp');
var exec = require('child_process').exec;
var browserSync = require('browser-sync').create();

gulp.task('compile', function (done) {
    exec('tsc', function (err, stdOut, stdErr) {
        console.log(stdOut);
        if (err) {
            done(err);
        } else {
            done();
        }
    });
});

gulp.task('polymerServe', function (done) {
    exec('polymer serve -p 502 -v', function (err, stdOut, stdErr) {
        console.log(stdOut);
        if (err) {
            done(err);
        } else {
            done();
        }
    });
});

gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: "localhost:502",
        files: '*.html, *.js, images/*, demo/*.html, demo/*.js',
        startPath: '/components/lss-api-service/demo/index.html'
    });
});

gulp.task('ts-watch', ['compile'], function () {
    gulp.watch('./demo/*.ts', ['compile']);
    gulp.watch('./*.ts', ['compile']);
});

gulp.task('default', ['ts-watch', 'polymerServe', 'browser-sync']);