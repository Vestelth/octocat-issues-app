"use strict";

// Load plugins
// const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();

const gulp = require("gulp");
const sass = require("gulp-sass");
// const postcss = require("gulp-postcss");
// const cssnano = require("cssnano");

// const imagemin = require("gulp-imagemin");
// const rename = require("gulp-rename");
// const uglify = require("gulp-uglify");

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

// BrowserSync Reload
// function browserSyncReload(done) {
//   browsersync.reload();
//   done();
// }

// Optimize Images
// function images() {
//   return gulp
//     .src("./assets/img/**/*")
//     .pipe(newer("./_site/assets/img"))
//     .pipe(
//       imagemin({
//         progressive: true,
//         svgoPlugins: [{ removeViewBox: false }]
//       })
//     )
//     .pipe(gulp.dest("./_site/assets/img"));
// }

// CSS task
function css() {
  return gulp
    .src("./scss/**/*.scss")
    // .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./css/"))
    // .pipe(rename({ suffix: ".min" }))
    // .pipe(postcss([autoprefixer(), cssnano()]))
    // .pipe(gulp.dest("./css/"));
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./scss/**/*", css);
//   gulp.watch(
    // [
    //   "./**/*"
    // ],
    // gulp.series(browserSyncReload)
//   );
//   gulp.watch("./assets/img/**/*", images);
}

// Tasks
gulp.task("css", css);
// gulp.task("images", images);
// gulp.task("clean", clean);

// build
gulp.task(
  "build",
  gulp.series(gulp.parallel(css))
);

// watch
gulp.task("default", gulp.parallel(watchFiles, browserSync));
