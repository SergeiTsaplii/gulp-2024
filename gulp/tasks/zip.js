import pkg from 'gulp';
import { deleteAsync } from 'del';
import zipPlugin from 'gulp-zip';
import filePaths from '../config/paths.js';
import logger from '../config/loger.js';

const { src, dest } = pkg;

const zip = () => {
  deleteAsync(`./${filePaths.projectDirName}.zip`)
    .then(() => logger.warning('Прошлый ZIP архив успешно удалён'));

  return src(`${filePaths.buildFolder}/**/*.*`, {})
    .pipe(logger.handleError('ZIP'))
    .pipe(zipPlugin(`${filePaths.projectDirName}.zip`))
    .pipe(dest('./'));
};

export default zip;
