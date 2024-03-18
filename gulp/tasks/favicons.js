import pkg from 'gulp';
import favicon from 'gulp-favicons';
import filter from 'gulp-filter';
import filePaths from '../config/paths.js';
import logger from '../config/loger.js';

const { src, dest } = pkg;

const favicons = () => src(filePaths.favicons.src)
  .pipe(logger.handleError('FAVICONS'))
  .pipe(dest(filePaths.favicons.dist))
  .pipe(favicon({
    icons: {
      favicons: true,
      appleIcon: true,
      online: false,
      appleStartup: false,
      android: true,
      firefox: false,
      yandex: false,
      windows: false,
      coast: false,
    },
    path: 'images/favicons',
  }))
  .pipe(dest(filePaths.favicons.dist))
  .pipe(filter(['favicon.ico', 'apple-touch-icon.png', 'icon.svg', 'site.webmanifest']))
  .pipe(dest(filePaths.buildFolder));

export default favicons;
