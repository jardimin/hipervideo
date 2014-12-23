var gulp = require('gulp')
,	$ = require('gulp-load-plugins')()


gulp.task('clean', function () {
    return gulp.src(['public/styles/*'], { read: false }).pipe($.clean());
});

gulp.task('styles', ['clean'], function () {
    return gulp.src('app/sass/main.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10
        }))
        .pipe(gulp.dest('public/styles'))
        .pipe($.livereload())
});

gulp.task('reload', function(){
	gulp.src('public/js/*')
		.pipe($.livereload())
});

gulp.task('serve', function () {
	$.nodemon({
		script: 'app.js',
		ignore: ['app']
	})
    .on('restart', function () {
        gulp.src('.').pipe($.livereload())
		console.log('restarted!')
	})
})

gulp.task('watch', function () {

    $.livereload.listen()

    // watch for changes

    gulp.watch(['app/**/*.jade'], ['reload'])
    gulp.watch(['public/**/*.js'], ['reload'])
    gulp.watch('app/sass/**/*.scss', ['styles'])

});

gulp.task('default', ['serve','watch']);