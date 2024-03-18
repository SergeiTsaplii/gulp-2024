import pkg from 'gulp';
import ftp from 'vinyl-ftp';
import util from 'gulp-util';
import configFTP from '../config/ftp.js';
import filePaths from '../config/paths.js';
import logger from '../config/loger.js';

const { src } = pkg;

const deploy = () => {
  configFTP.log = util.log;
  const ftpConnect = ftp.create(configFTP);

  return src(`${filePaths.buildFolder}/**/*.*`, {})
    .pipe(logger.handleError('FTP_DEPLOY'))
    .pipe(ftpConnect.dest(`/${filePaths.ftp}/${filePaths.projectDirName}`));
};

export default deploy;
