var gulp        = require('gulp');
var include     = require('gulp-file-include');
var rename      = require('gulp-rename');

gulp.task('html', function(){
    gulp.src('html/main.html')
    .pipe(include({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(rename('/index.html'))
    .pipe(gulp.dest('./'))
});