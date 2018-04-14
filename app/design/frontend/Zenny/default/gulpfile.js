/*
 * Trezo Soluções Web
 *
 * NOTICE OF LICENSE
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to https://www.trezo.com.br for more information.
 *
 * @category Trezo
 * @package base
 *
 * @copyright Copyright (c) 2017 Trezo Soluções Web. (https://www.trezo.com.br)
 *
 * @author Trezo Core Team <labs@trezo.com.br>
 * @author Carlos Gartner <carlos@trezo.com.br>
 */
'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    postcss = require('gulp-postcss'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('autoprefixer'),
    gcmq = require('gulp-group-css-media-queries');

// Set the url of store development
const devUrl = 'dev.zenny';

// Task for scripts
gulp.task('scripts', function () {
    return gulp.src('./scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./web/js'))
        .pipe(browserSync.stream());
});

gulp.task('browserSync', function () {
    browserSync.init({
        proxy: {
            target: 'http://' + devUrl,
            cookies: {stripeDomain: false}
        },
        "rewriteRules": [
            {
                "match": "." + devUrl,
                "replace": ""
            }
        ],
        files: ["./web/css/**/*.css"],
        open: false,
        https: true
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('watch', ['browserSync'], function () {
    gulp.watch("./styles/**/*.scss", ['styles']);
    gulp.watch("./scripts/*.js", ['scripts']);
    gulp.watch("**/*.{phtml,xml,csv}", ['bs-reload']);
});

gulp.task('default', ['watch']);

gulp.task('styles', function () {
    var processors = [
        autoprefixer,
    ];
    return gulp.src('./styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gcmq())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./web/css'));
});

gulp.task('styles:vendor', [
    'styles:vendor:bootstrap',
    'styles:vendor:font-awesome',
    'styles:vendor:neat',
    'styles:vendor:animate',
    'styles:vendor:slick',
    'styles:vendor:owl'
]);

gulp.task('styles:vendor:bootstrap', function () {
    return gulp.src('./node_modules/bootstrap/scss/**/*').pipe(gulp.dest('./styles/vendor/bootstrap'));
});

gulp.task('styles:vendor:neat', function () {
    return gulp.src('./node_modules/bourbon-neat/core/**/*').pipe(gulp.dest('./styles/vendor/neat'));
});

gulp.task('styles:vendor:font-awesome', function () {
    return gulp.src('./node_modules/font-awesome/scss/**/*').pipe(gulp.dest('./styles/vendor/font-awesome'));
});

gulp.task('styles:vendor:animate', function () {
    return gulp.src('./node_modules/animate.scss/vendor/assets/stylesheets/**/*').pipe(gulp.dest('./styles/vendor/animate'));
});

gulp.task('styles:vendor:slick', function () {
    return gulp.src('./node_modules/slick-carousel/slick/*.scss').pipe(gulp.dest('./styles/vendor/slick'));
    return gulp.src('./node_modules/slick-carousel/slick/slick.min.js').pipe(gulp.dest('./web/js/vendor'));
});

gulp.task('styles:vendor:owl', function () {
    return gulp.src('./node_modules/owl.carousel/src/scss/*.scss').pipe(gulp.dest('./styles/vendor/owl'));
    return gulp.src('./node_modules/owl.carousel/dist/owl.carousel.min.js').pipe(gulp.dest('./web/js/vendor'));
});

gulp.task('fonts', function () {
    return gulp.src('./node_modules/font-awesome/fonts/**/*').pipe(gulp.dest('./web/fonts'));
});
