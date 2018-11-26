var gulp            = require('gulp');
var include         = require('gulp-file-include');
var rename          = require('gulp-rename');
var less            = require('gulp-less');
var autoprefixer    = require('gulp-autoprefixer');
var cssmin          = require('gulp-cssmin');
var cssnano         = require('gulp-cssnano');
var uglify          = require('gulp-uglify');
var concat          = require('gulp-concat');
var sourcemaps      = require('gulp-sourcemaps');
var imagemin        = require('gulp-imagemin');
var clean           = require('gulp-clean');

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
    return gulp.src('src/styles/less/main.less')
    .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write()) 
    .pipe(gulp.dest('build/css'))
});

gulp.task('css-libs', function(){
    return gulp.src('src/styles/libs/*.css')
    .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())    
    .pipe(gulp.dest('build/css'))
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init()) 
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/img'))
});

gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});

gulp.task('copy-fonts', function() {
    return gulp.src('src/fonts/**/*.*')
      .pipe(gulp.dest('build/fonts'));
  });
  
gulp.task('copy-favicon', function() {
    return gulp.src('src/favicon/**/*.*')
    .pipe(gulp.dest('build/favicon'));
  });
gulp.task('copy', ['copy-fonts', 'copy-favicon']);

/* ************************************** */

gulp.task('watch', ['html','img','copy','css','css-libs','scripts'], function() {
    gulp.watch('src/html/**/*.html', ['html']);
    gulp.watch('src/styles/**/*.less', ['css']);
    gulp.watch('src/styles/**/*.css', ['css-libs']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/img/**/*', ['img']);
});

gulp.task('build', ['html','img','copy','css','css-libs','scripts'], function() {
});
