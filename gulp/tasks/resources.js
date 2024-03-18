import pkg from 'gulp';
import filePaths from '../config/paths.js';
import logger from '../config/loger.js';

const { src, dest } = pkg;

const resources = () => src(filePaths.resources.src)
  .pipe(logger.handleError('RESOURCES'))
  .pipe(dest(filePaths.resources.dist));

export default resources;
