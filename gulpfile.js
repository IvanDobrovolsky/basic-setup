/*

css:
    1. compile less -> css
    2. autoprefixer
    3. minify
    4. concat ?
    
dev server    

watch

browser sync


* */

const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();

gulp.task('html', () => {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.stream());
});

gulp.task('css', ['html'], () => {
    gulp
        .src(['./node_modules/bootstrap/dist/css/bootstrap.css', './src/assets/styles/main.less'])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./build/css/'))
        .pipe(browserSync.stream());
});

gulp.task('server', ['css'], () => {
    const stream = nodemon({
        script: 'server.js',
        ignore: ['gulpfile.js', 'server.js']
    });

    stream
        .on('restart', function () {
            console.log('restarted!')
        })
        .on('crash', function() {
            console.error('Application has crashed!\n')
            stream.emit('restart', 10)  // restart the server in 10 seconds
        });
});

gulp.task('sync', ['server'], function () {
    browserSync.init({
        proxy: "localhost:7777"
    });
});

gulp.task('default', ['sync'], () => {
    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/assets/**/*.less', ['css']);
});