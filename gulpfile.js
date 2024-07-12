const gulp = require("gulp"),
    browserSync = require("browser-sync"),
    sass = require("gulp-sass")(require("sass")),
    cleanCSS = require("gulp-clean-css"),
    autoprefixer = require("gulp-autoprefixer"),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    imagemin = require("gulp-imagemin"),
    htmlmin = require("gulp-htmlmin");

gulp.task("server", function () {
    browserSync.init({
        proxy: "LevelUp",
    });

    gulp.watch("src/index.html").on("change", function () {
        browserSync.reload();
    });
    gulp.watch("src/scss/**/*.+(scss|sass)").on("change", function () {
        browserSync.reload();
    });
    gulp.watch("src/js/*.js").on("change", function () {
        browserSync.reload();
    });
});

gulp.task("styles", function () {
    return gulp
        .src("src/scss/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(rename({ suffix: ".min", prefix: "" }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task("watch", function () {
    gulp.watch("src/scss/**/*.+(scss|sass|css)", gulp.parallel("styles"));
    gulp.watch("src/index.html").on("change", gulp.parallel("html"));
    gulp.watch("src/js/*.js").on("change", gulp.parallel("scripts"));
});

gulp.task("html", function () {
    return gulp
        .src("src/index.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist"));
});

gulp.task("scripts", function () {
    return (
        gulp
            .src("src/js/*.js")
            .pipe(babel())
            // .pipe(concat('quiz.min.js'))
            .pipe(uglify())
            .on("error", function (err) {
                console.error("Error in concatenating or transpiling:", err.toString());
            })
            .pipe(gulp.dest("dist/js"))
    );
});

gulp.task("images", function () {
    return gulp.src("src/images/*").pipe(imagemin()).pipe(gulp.dest("dist/images"));
});

gulp.task("videos", function () {
    return gulp.src("src/videos/*").pipe(gulp.dest("dist/videos"));
});

gulp.task("default", gulp.parallel("watch", "server", "html", "styles", "scripts", "images", "videos"));
