import path from 'path';

const srcFolder = './src';
const buildFolder = './dist';

const filePaths = {
  buildFolder,
  srcFolder,
  projectDirName: path.basename(path.resolve()),
  ftp: '',
};

export default filePaths;
