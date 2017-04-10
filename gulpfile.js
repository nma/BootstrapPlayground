var gulp = require('gulp');
var sass = require('gulp-sass');
var cssbeautify = require('gulp-cssbeautify');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 35729}));
  app.use(express.static(__dirname));
  app.listen(3030, '0.0.0.0');
});

gulp.task('livereload', function() {
  livereload.listen(35729);
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssbeautify())
    .pipe(gulp.dest('./css'));
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  gulp.src(fileName).pipe(livereload());
}

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('*.html', notifyLiveReload);
  gulp.watch('./css/*.css', notifyLiveReload);
});

gulp.task('cssbeautify', function() {
  return gulp.src(['./css/*.css', '!css/bootstrap*.css'])
    .pipe(cssbeautify())
    .pipe(gulp.dest('./css/'));
});

gulp.task('build', ['sass', 'cssbeautify']);


gulp.task('default', ['express', 'livereload', 'watch'], function() {

});
