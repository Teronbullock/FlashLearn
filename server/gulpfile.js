import gulp from 'gulp';
import terser from 'gulp-terser';
import rename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import * as sassCompiler from 'sass';
import cleanCSS from 'gulp-clean-css';

const sass = gulpSass(sassCompiler);
const { src, dest, series, watch, parallel } = gulp;

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
  // watch('src/sass/**/*.scss', compileSass);
}




// Export Gulp tasks
export default series(minifyJS, compileSass, watchAll);
// exports.watch = series(minifyJS, compileSass, watchAll);
export const runWatch = series(minifyJS, watchAll);
export const getScripts = minifyJS;
export const getStyles = compileSass;