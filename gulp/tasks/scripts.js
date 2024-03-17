import pkg from 'gulp';
import webpack from 'webpack-stream';
import webpackConfig from '../../webpack.config.js';
import plugins from '../config/plugins.js';
import filePaths from '../config/paths.js';
import logger from '../config/loger.js';

const { src, dest } = pkg;

const scripts = async (isDev) => src(filePaths.scripts.src)
  .pipe(logger.handleError('SCRIPTS'))
  .pipe(webpack({ config: await webpackConfig(isDev) }))
  .pipe(dest(filePaths.scripts.dist))
  .pipe(plugins.browserSync.stream());

export default scripts;
