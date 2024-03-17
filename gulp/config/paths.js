import path from 'path';

const srcFolder = './src';
const buildFolder = './dist';

const filePaths = {
  html: {
    src: `${srcFolder}/html/*.html`,
    dist: `${buildFolder}/`,
    watch: `${srcFolder}/**/*/html`,
  },
  styles: {
    src: `${srcFolder}/scss/*.scss`,
    dist: `${buildFolder}/css/`,
    watch: `${srcFolder}/scss/**/*.scss`,
  },
  buildFolder,
  srcFolder,
  projectDirName: path.basename(path.resolve()),
  ftp: '',
};

export default filePaths;
