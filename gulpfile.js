const gulp = require('gulp');
var gls = require('gulp-live-server');
const {  src, dest, series, watch } = require('gulp');
const postcss = require('gulp-postcss');
// const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

gulp.task('watch', () => {
    var server = gls.static(['dist']);
    server.start();

	gulp.watch(['src/**/*.html', 'src/**/*.css'], function (file) {
		server.notify.apply(server, [file]);
	  });
    // browserSync.init({
    //     proxy: 'localhost:8080'
    // })
    // gulp.watch(['src/**/*.html'], series('copy-html+css-and-reload'));
    // gulp.watch(['src/main/resources/**/*.svg'], gulp.series('copy-svg+css-and-reload'));
    // gulp.watch(['src/main/resources/**/*.css'], gulp.series('copy-css-and-reload'));
    // gulp.watch(['src/main/resources/**/*.js'], gulp.series('copy-js-and-reload'));
})

// exports.default = function() {
//   return src('src/*.html')
//     .pipe(dest('dist/'));
// }
gulp.task('copy-html', () =>
    src(['src/**/*.html'])
        .pipe(gulp.dest('dist/'))
);

gulp.task('css', () => {
	const postcss = require('gulp-postcss');
  
	return gulp.src('./src/input.css')
	  .pipe(postcss([
		// require('precss'),
		require('tailwindcss'),
		require('autoprefixer')
	  ]))
	  .pipe(gulp.dest('./dist/'));
  });

// gulp.task('copy-css', () =>
//     src(['src/**/*.css'])
//         .pipe(postcss())
//         // .pipe(production(uglifycss()))
//         .pipe(dest('dist/'))
// );

gulp.task('copy-html+css-and-reload', series('copy-html', 'css', reload));
gulp.task('build', gulp.series('copy-html', 'css'));
// gulp.task('build', gulp.series('copy-html', 'copy-css'));
gulp.task('default', gulp.series('watch'));

function reload(done) {
    browserSync.reload();
    done();
}