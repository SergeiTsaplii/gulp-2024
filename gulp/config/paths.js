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
  scripts: {
    src: `${srcFolder}/js/*.js`,
    dist: `${buildFolder}/js/`,
    watch: `${srcFolder}/js/**/*.js`,
  },
  buildFolder,
  srcFolder,
  projectDirName: path.basename(path.resolve()),
  ftp: '',
};

export default filePaths;
