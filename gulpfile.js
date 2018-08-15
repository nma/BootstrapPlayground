var gulp = require('gulp');
var sass = require('gulp-sass');
var cssbeautify = require('gulp-cssbeautify');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssbeautify())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('*.html', browserSync.reload);
  // gulp.watch('./css/*.css', browserSync.reload);
});

gulp.task('cssbeautify', function() {
  return gulp.src(['./css/*.css', '!css/bootstrap*.css'])
    .pipe(cssbeautify())
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());
});

gulp.task('build', ['sass', 'cssbeautify']);


gulp.task('default', ['browser-sync', 'watch'], function() {

});
