/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    glob = require("glob"),
    minify = require("gulp-minify"),
    babel = require("gulp-babel"),
    exec = require("gulp-exec"),
    eslint = require('gulp-eslint'),
    webpack = require('gulp-webpack');

var basePath = "./forms/";
var subPath = "**";
var packSchema = "*.bundling.js";
var lintSchema = "!(*.script|*.bundle|*.GeneratedObject|*.script.min|*.bundling|*.bundled|*.bundled.min|*.min).js";
var shouldMinify = true;



gulp.task("bundle-all-no-lint", function (done) {
    basePath = "././";
    subPath = ".";
    gulp.start(["bundle"], done);
});

gulp.task("bundle-apps", function (done) {
    basePath = "./_project/";
    subPath = "**";
    gulp.start(["lint"], done);
    gulp.start(["bundle"], done);
});

gulp.task("bundle-apps-no-minify", function (done) {
    shouldMinify = false;
    basePath = "./_project/";
    subPath = "**";
    gulp.start(["lint"], done);
    gulp.start(["bundle"], done);
});

gulp.task("bundle-forms-and-ribbons", function (done) {
    basePath = "./forms/";
    subPath = "**";
    gulp.start(["lint"], done);
    gulp.start(["bundle"], done);
});

gulp.task("bundle-lint-no-minify", function (done) {
    shouldMinify = false;
    gulp.start(["lint"], done);
    gulp.start(["bundle"], done);
});

gulp.task("bundle-no-minify", function (done) {
    shouldMinify = false;
    gulp.start(["bundle"], done);
});

gulp.task("bundle-apps", function (done) {
    basePath = "./_project/";
    subPath = "**";
    gulp.start(["lint"], done);
    gulp.start(["bundle"], done);
});

gulp.task("bundle-forms-and-ribbons", function (done) {
    basePath = "./forms/";
    subPath = "**";
    gulp.start(["lint"], done);
    gulp.start(["bundle"], done);
});

gulp.task("CRMLibrary", function (done) {
    basePath = "./Libraries/";
    subPath = "CRMLibrary";
    gulp.start(["bundle"], done);
});

gulp.task("lint", function (done) {
    var path = `${basePath}/${subPath}`;
    glob(`${path}/**/${lintSchema}`,
        //glob(`./forms/**/${lintSchema}`,
        //glob([`${path}/**/${lintSchema}`, "*!.script.min.js", "!*.bundle.js", "!*.script.js"],
        //glob(`${path}/**/${lintSchema}`,
        //{ ignore: [`${path}/**/*.bundle.js`, `${path}/**/*.script.js`] },
        {
            //ignore: ["*.bundle.js", "*.script.js", "*.script.min.js"],
            //debug: true
        },
        function (err, files) {
            if (err)
                done(err);

            files.map(function (file) {

                var scriptFileName = file.substring(file.lastIndexOf("/") + 1, file.length);
                var filePath = file.substr(2, file.lastIndexOf("/") - 1).replace(/\//g, "\\");
                var scriptFile = file.substr(2, file.length).replace(/\//g, "\\");

                console.log(".");
                console.log("------------------------");
                console.log("Executing linting pipeline for");
                console.log(scriptFileName);
                console.log(`Working directory: ${filePath}`);
                console.log(`Script found: ${scriptFile}`);
                console.log("------------------------");
                console.log(".");

                // Generate pipeline for file
                return gulp.src(`${file}`)
                    //ESLint
                    // eslint() attaches the lint output to the "eslint" property
                    // of the file object so it can be used by other modules.
                    .pipe(eslint())
                    // eslint.format() outputs the lint results to the console.
                    // Alternatively use eslint.formatEach() (see Docs).
                    .pipe(eslint.format())
                    // To have the process exit with an error code (1) on
                    // lint error, return the stream and pipe to failAfterError last.
                    .pipe(eslint.failAfterError());
            });
        });
});

gulp.task("bundle", function (done) {
    glob(`${basePath}/${subPath}/**/${packSchema}`, function (err, files) {
        if (err)
            done(err);

        files.map(function (file) {

            var scriptFileName = file.substring(file.lastIndexOf("/") + 1, file.length);
            var filePath = file.substr(2, file.lastIndexOf("/") - 1).replace(/\//g, "\\");
            var scriptFile = file.substr(2, file.length).replace(/\//g, "\\");
            var destFileAppendix = !shouldMinify ? "bundled.min" : "bundled";
            var destFileName = scriptFileName.replace(/bundling/, destFileAppendix);

            console.log(".");
            console.log("------------------------");
            console.log("Executing pipeline for");
            console.log(scriptFileName);
            console.log(`Working directory: ${filePath}`);
            console.log(`Script found: ${scriptFile}`);
            console.log(`Destination File Name: ${destFileName}`);
            console.log("------------------------");
            console.log(".");

            var babelSettings = {
                presets: ["es2015"]
            };

            if (!shouldMinify) {
                babelSettings.compact = false;
            }

            // Generate pipeline for file
            var pipeline = gulp.src(`${file}`)
                .pipe(webpack({
                    output: { filename: destFileName },
                    module: {
                        noParse: [/localforage.js/, /jquery.jqgrid.min.js/]
                    }
                }))
                // Transpile js code into ES5
                .pipe(babel(babelSettings));

            if (shouldMinify) {
                pipeline = pipeline.pipe(minify({
                    ext: {
                        min: ".min.js"
                    },
                    noSource: true
                }));
            }
            return pipeline.pipe(gulp.dest(filePath));
        });
    });
});

//Release
gulp.task("CRMLibrary", function (done) {
    basePath = "./Libraries/";
    subPath = "CRMLibrary";
    gulp.start(["bundle"], done);
});