

var gulp 				= require('gulp');
var styleguide 	= require("sc5-styleguide");
var config 			= require('../config');


gulp.task("styleguide", function() {
  var outputPath = './docs';

  return gulp.src(["**/*.scss"])
    .pipe(styleguide({
        title: "My Styleguide",
        server: true,
        rootPath: outputPath,
        overviewPath: "./docs/overview.md",
        sass: config.sass.options
            // Options passed to gulp-sass
        ,
        less: {
            // Options passed to gulp-less
        }
      }))
    .pipe(gulp.dest(outputPath));
});


gulp.task("styleguide-watch", ["styleguide"], function() {
  // Start watching changes and update styleguide whenever changes are detected
  // Styleguide automatically detects existing server instance
  gulp.watch(config.sass.src, ["styleguide"]);
});