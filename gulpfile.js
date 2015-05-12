var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var imgmin = require('gulp-imagemin');
var changed = require('gulp-changed');

var config = {
  sass: './src/sass/style.scss',
  images: './src/assets/unop-images/*.{png,jpg,jpeg,svg}',
  build: './_site/'
}

gulp.task('images', function(){
  return gulp.src(config.images)
  .pipe(changed(config.build + '/assets'))
  .pipe(gulp.dest('./src/assets/images'));
});

gulp.task('sass', function(){
  return gulp.src(config.sass)
  .pipe(sass({
    style: 'expanded'
  }))
  .pipe(prefix({
    browsers: ['last 2 versions'],
    cascade: true
  }))
  .pipe(csso())
  .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', function(){
  gulp.start('sass');
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});