const gulp = require("gulp");
const watch = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");
const babel = require("gulp-babel");

const cssFiles = "./public/css/source/**/*.css";
const sassFiles = "./public/css/source/sass/**/*.scss";
const vendorFiles = ["./public/js/vendor/jquery.min.js", "./public/js/vendor/bootstrap.min.js", "./public/js/vendor/angular.min.js"];

gulp.task("sass", () => {
    gulp
        .src(sassFiles)
        .pipe(gulpSASS())
        .pipe(concatenate("styles-from-sass.min.css"))
        .pipe(autoPrefix())
        .pipe(cleanCSS())
        .pipe(gulp.dest("./public/css/"));
});

gulp.task("watch", () => {
    gulp.watch(sassFiles, ["sass"]);
});

gulp.task("default", ["watch"]);

gulp.task("build", ["sass"]);