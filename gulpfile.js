var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var babel = require('gulp-babel');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var ejs = require("gulp-ejs");
var log = require('fancy-log')

var outputDir = './public';
 
//livereload task
gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

//css compiler
gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`./${outputDir}/css`))
    .pipe(connect.reload());
});

//js compiler
gulp.task('es6', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(`./${outputDir}/js`))
    .pipe(connect.reload());
})

//minify css
gulp.task('css', function () {
  gulp.src(`./${outputDir}/**/*.css`)
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest(outputDir));
});

//compile ejs to html
gulp.task('ejs', function() {
  gulp.src('./src/*.ejs')
    .pipe(ejs({
        msg: 'Hello Gulp!'
    }, {}, { ext: '.html' }).on('error', log))
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload());
})

gulp.task('run', ['sass', 'css', 'es6', 'ejs']);

gulp.task('watch', function() {

  var server = livereload();

  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch(`./${outputDir}/**/*.css`, ['css']);
  gulp.watch('./src/js/**/*.js', ['es6']);
  gulp.watch('./src/*.ejs', ['ejs']);
})

gulp.task('default', ['run', 'watch', 'connect']);