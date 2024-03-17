import pkg from 'gulp';
import imagemin from 'gulp-imagemin';
import avif from 'imagemin-avif';
import webp from 'imagemin-webp';
import extReplace from 'gulp-ext-replace';
import plugins from '../config/plugins.js';
import filePaths from '../config/paths.js';
import logger from '../config/loger.js';

const { src, dest } = pkg;

const images = (isBuild) => src(filePaths.images.src)
  .pipe(logger.handleError('IMAGES'))
  .pipe(plugins.newer(filePaths.images.dist))
  // avif
  .pipe(plugins.if(isBuild, imagemin(avif({ quality: 50 }))))
  .pipe(plugins.if(isBuild, extReplace('.avif')))
  .pipe(plugins.if(isBuild, dest(filePaths.images.dist)))
  // webp
  .pipe(plugins.if(isBuild, src(filePaths.images.src)))
  .pipe(plugins.if(isBuild, plugins.newer(filePaths.images.dist)))
  .pipe(plugins.if(isBuild, imagemin(webp({ quality: 85 }))))
  .pipe(plugins.if(isBuild, extReplace('.webp')))
  .pipe(plugins.if(isBuild, dest(filePaths.images.dist)))
  // other images
  .pipe(plugins.if(isBuild, src(filePaths.images.src)))
  .pipe(plugins.if(isBuild, plugins.newer(filePaths.images.dist)))
  .pipe(plugins.if(isBuild, imagemin([
    imagemin.gifsicle({ interlaced: true }),
    imagemin.mozjpeg({ quality: 85, progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
  ], {
    verbose: true,
  })))
  .pipe(dest(filePaths.images.dist))
  .pipe(plugins.browserSync.stream());

export default images;
