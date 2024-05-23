const { src, dest, series, watch, parallel } = require('gulp');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');


function minifyJS() {
  return src('src/js/*.js')
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('public/js'));
}


function compileSass() {
  return src('src/sass/**/*.scss')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('public/css'));
}

function watchAll() {
  watch('src/js/*.js', minifyJS);
  watch('src/sass/**/*.scss', compileSass);
}




// Export Gulp tasks
exports.default = series(minifyJS, compileSass, watchAll);
exports.watch = series(minifyJS, compileSass, watchAll);
exports.scripts = minifyJS;
exports.styles = compileSass;