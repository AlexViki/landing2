var gulp            = require('gulp');
var include         = require('gulp-file-include');
var rename          = require('gulp-rename');
var less            = require('gulp-less');
var autoprefixer    = require('gulp-autoprefixer');
var cssmin          = require('gulp-cssmin');
cssnano             = require('gulp-cssnano');

/* ************************************** */

gulp.task('html', function(){
    return gulp.src('src/html/main.html')
    .pipe(include({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(rename('/index.html'))
    .pipe(gulp.dest('build'))
});

gulp.task('css', function(){
    return gulp.src('styles/less/main.less')
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
    }))
    .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'))
});

gulp.task('css-libs', function(){
    return gulp.src('styles/libs/*.css')
    .pipe(cssnano())
    .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'))
});

/* ************************************** */

gulp.task('watch', function() {
    gulp.watch('html/**/*.html', ['html']);
    gulp.watch('styles/**/*.less', ['css']);
    gulp.watch('styles/**/*.scc', ['css-libs']);
});