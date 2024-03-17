import pkg from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import avifcss from 'gulp-avif-css-fix';
import groupMediaQueries from 'gulp-group-css-media-queries';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import plugins from '../config/plugins.js';
import filePaths from '../config/paths.js';
import logger from '../config/loger.js';

const { src, dest } = pkg;
const sass = gulpSass(dartSass);

const styles = (isBuild) => src(filePaths.styles.src, { sourcemaps: !isBuild })
  .pipe(logger.handleError('STYLES'))
  .pipe(sass({ includePaths: ['node_modules'] }, null))
  .pipe(plugins.replace(/(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\\/'"]+(\/))?([^'"]*)\1/gi, '$1$2$3$4$6$1'))
  .pipe(plugins.if(isBuild, groupMediaQueries()))
  .pipe(plugins.if(isBuild, avifcss()))
  .pipe(plugins.if(isBuild, postcss(
    [autoprefixer({ cascade: false, grid: true }), postcssPresetEnv()],
  )))
  .pipe(plugins.if(isBuild, cleanCss({ level: 2 })))
  .pipe(plugins.if(isBuild, rename({ suffix: '.min' })))
  .pipe(dest(filePaths.styles.dist, { sourcemaps: !isBuild ? '.' : '' }))
  .pipe(plugins.browserSync.stream());

export default styles;
