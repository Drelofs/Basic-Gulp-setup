'use strict';

const 	gulp = require('gulp'),
	  	browsersync = require("browser-sync"),
	  	livereload = require('gulp-livereload'),
	  	clean = require('gulp-clean'),
	  	imagemin = require('gulp-imagemin'),
	  	cache = require('gulp-cache'),
	  	sass = require('gulp-sass'),
	  	cssmin = require('gulp-cssmin'),
		jshint = require('gulp-jshint'),
		notify = require('gulp-notify'),
		rename = require('gulp-rename'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat');

function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: "./dist",
	  	},
	  	port: 3000
	});
	done();
}

function reload(done) {
	browsersync.reload();
	done();
}

function cleaning(){
	return gulp
		.src(['dist/css', 'dist/js', 'dist/img'], {read: false, allowEmpty: true})
    .pipe(clean());
}

function styles() {
	return gulp
		.src('app/scss/main.scss')
		.pipe(sass()).on('error', sass.logError)
		.pipe(gulp.dest('app/css/'))
		.pipe(livereload({ start: true }))
}

function minifystyles(){
	return gulp
		.src('app/css/main.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css/'))
		.pipe(livereload({ start: true }))
}

function vendor() {
	return gulp
		.src('app/js/vendor/*.js')
		.pipe(uglify())
		.pipe(concat('vendor.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/js/'))
		.pipe(livereload({ start: true }))
}

function scripts(){
	return gulp
		.src('app/js/app.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(concat('scripts.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/js/'))
		.pipe(livereload({ start: true }))
}

function images(){
	return gulp
		.src('app/img/*.*')
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest('dist/img'))
		.pipe(notify({ message: 'Images task complete' }))
		.pipe(livereload({ start: true }))
}

function move(done){
    gulp.src('app/*.html')
	  .pipe(gulp.dest('dist/'))
	  .pipe(notify({ message: 'Moving HTML files to dist folder' }))
    done();
}

function watching(){
	livereload.listen({ basePath: 'dist' })
	gulp.watch('app/scss/**/*.scss', gulp.series(styles, minifystyles, reload))
	gulp.watch('app/js/*.js', gulp.series(vendor, scripts, reload))
	gulp.watch('app/*.html', gulp.series(move, reload))
	gulp.watch('app/img/*.*', gulp.series(images, reload))
}

const 	css = gulp.series(styles, minifystyles),
		js = gulp.parallel(vendor, scripts),
		watch = gulp.series(cleaning, watching),
		defaultTasks = gulp.series(cleaning, styles, minifystyles, vendor, scripts, images, move, browserSync, watching);

exports.css = css;
exports.js = js;
exports.default = defaultTasks;
exports.move = move;
exports.watch = watch;
