"use strict";
var gulp = require("gulp");
var del = require("del");
var sourcemaps = require('gulp-sourcemaps');

/**
 * Remove build directory.
 */
gulp.task('clean', function (cb) {
    return del(["build"], cb);
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", ["server", "app", "assets"], function () {
    console.log("Building resources...");
});
/* copy the app core files to the build folder */
gulp.task("app", ['index'], function(){
    return gulp.src(["src/**/*.js", "!**/*.ts", "!src/server/**"])
        .pipe(gulp.dest("build"));
});
/* get the index file to the root of the build */
gulp.task("index", function(){
    return gulp.src(["index.html"], { cwd: "src/**" })
        .pipe(gulp.dest("build"));
});
/* copy node server to build folder */
gulp.task("server", function () {
    return gulp.src(["index.js", "package.json"], { cwd: "src/server/**" })
        .pipe(gulp.dest("build"));
});
/* styles and other assets */
gulp.task("assets", function(){
    return gulp.src(["styles.css"], { cwd: "src/**" })
        .pipe(gulp.dest("build"));
});
/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", function () {
    return gulp.src([
        'es6-shim/es6-shim.min.js',
        'systemjs/dist/system-polyfills.js',
        'angular2/bundles/angular2-polyfills.js',
        'angular2/es6/dev/src/testing/shims_for_IE.js',
        'systemjs/dist/system.src.js',
        // 'rxjs/bundles/Rx.js',
        'rxjs/**/*.js',
        'angular2/bundles/angular2.dev.js',
        'angular2/bundles/router.dev.js',
        'core-js/client/shim.min.js',
        'zone.js/dist/zone.js',
        '@angular/core/bundles/core.umd.js',
        '@angular/common/bundles/common.umd.js',
        '@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http/bundles/http.umd.js',
        '@angular/router/bundles/router.umd.js',
        '@angular/forms/bundles/forms.umd.js'
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("build/node_modules"));
});
/**
 * Build the project.
 */
gulp.task("default", ['resources', 'libs'], function () {
    console.log("Building the project ...");
});