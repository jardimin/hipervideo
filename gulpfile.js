var gulp = require('gulp')
,	$ = require('gulp-load-plugins')()


// gulp clean (excluir arquivos que sao compilados)

gulp.task('clean', function () {
    return gulp.src(['public/styles/*'], { read: false }).pipe($.clean());
});

// gulp vue (compilar com vueify)

gulp.task("vue", function() {
    return gulp.src('app/vue/main.js')
        .pipe($.browserify({
            transform: 'vueify'
        }))
        .pipe(gulp.dest('public/js'))
        .pipe($.livereload())
});

// gulp styles (compilar sass)

gulp.task('styles', ['clean'], function () {
    return gulp.src('app/sass/main.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10
        }))
        .pipe(gulp.dest('public/styles'))
        .pipe($.livereload())
});

// gulp reload (livereload)

gulp.task('reload', function(){
	gulp.src('public/js/*')
		.pipe($.livereload())
});

// gulp serve (nodemon)

gulp.task('serve', function () {
	$.nodemon({
		script: 'app.js',
		ignore: ['app','public/js']
	})
    .on('restart', function () {
        gulp.src('.').pipe($.livereload())
		console.log('restarted!')
	})
})

// gulp watch

gulp.task('watch', function () {

    $.livereload.listen()

    // watch for changes

    gulp.watch(['app/**/*.jade'], ['reload'])
    gulp.watch(['public/**/*.js'], ['reload'])
    gulp.watch(['app/sass/**/*.scss'], ['styles'])
    gulp.watch(['app/vue/**/*.*'], ['vue'])

});

// gulp build

gulp.task('build', ['styles', 'vue']);

// gulp

gulp.task('default', ['build','serve','watch']);