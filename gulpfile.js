// Load plugins
var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    header      = require('gulp-header'),
    rename      = require('gulp-rename'),
    es          = require('event-stream'),
    minifyCSS   = require('gulp-minify-css'),
    package     = require('./package.json'),
    paths       = {
                    sass: {
                        root:       './src/stylesheets/**/*.scss',
                        rtl:        './src/stylesheets/bootstrap-rtl.scss',
                        ltr:        './src/stylesheets/bootstrap-ltr.scss'
                    },
                    css: {
                        dist: {
                            rtl:    './dist/css/rtl/',
                            ltr:    './dist/css/ltr/'
                        },
                        test: {
                            rtl:    './test/dist/css/rtl',
                            ltr:    './test/dist/css/ltr'
                        }
                    }
                };

var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.homepage %>\n' +
  ' * @author  <%= package.author.name %>\n' +
  ' * @twiter  <%= package.author.twitter %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

gulp.task('sass', function() {
    return es.concat(
        gulp.src(paths.sass.rtl)
            .pipe(sass({
                errLogToConsole: true
            }))
            .pipe(rename({
                basename:'bootstrap'
            }))
            .pipe(header(banner, { package : package }))
            .pipe(gulp.dest(paths.css.dist.rtl))
            .pipe(minifyCSS({
                keepSpecialComments:1
            }))
            .pipe(rename({
                suffix:'.min'
            }))
            .pipe(gulp.dest(paths.css.dist.rtl))
            // for minify version of css for test example
            /*.pipe(gulp.dest(paths.css.test.rtl))*/,
        gulp.src(paths.sass.ltr)
            .pipe(sass({
                errLogToConsole: true
            }))
            .pipe(rename({
                basename:'bootstrap'
            }))
            .pipe(header(banner, { package : package }))
            .pipe(gulp.dest(paths.css.dist.ltr))
            .pipe(minifyCSS({
                keepSpecialComments:1
            }))
            .pipe(rename({
                suffix:'.min'
            }))
            .pipe(gulp.dest(paths.css.dist.ltr))
            // for minify version of css for test example
            // .pipe(gulp.dest(paths.css.test.ltr))
    );
});


gulp.task('default', ['sass'], function() {
    gulp.watch(paths.sass.root, ['sass']);
});
