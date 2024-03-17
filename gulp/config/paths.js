import path from 'path';

const srcFolder = './src';
const buildFolder = './dist';

const filePaths = {
  html: {
    src: `${srcFolder}/html/*.html`,
    dist: `${buildFolder}/`,
    watch: `${srcFolder}/**/*/html`,
  },
  buildFolder,
  srcFolder,
  projectDirName: path.basename(path.resolve()),
  ftp: '',
};

export default filePaths;
