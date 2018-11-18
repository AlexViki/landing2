var gulp            = require('gulp');
var include         = require('gulp-file-include');
var rename          = require('gulp-rename');
var less            = require('gulp-less');
var autoprefixer    = require('gulp-autoprefixer');

/* ************************************** */

gulp.task('html', function(){
    return gulp.src('html/main.html')
    .pipe(include({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(rename('/index.html'))
    .pipe(gulp.dest('./'))
});

gulp.task('less', function(){
    gulp.src('/less/main.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('/css'))
});

/* ************************************** */

gulp.task('watch', function() {
    gulp.watch('html/**/*.html', ['html']);
});