"use strict";

// Load plugins
const browsersync = require("browser-sync").create();

const gulp = require("gulp");
const sass = require("gulp-sass");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// CSS task
function css() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./css/"))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./scss/**/*", css);
}

// Tasks
gulp.task("css", css);

// build
gulp.task(
  "build",
  gulp.series(gulp.parallel(css))
);

// watch
gulp.task("default", gulp.parallel(watchFiles, browserSync));
