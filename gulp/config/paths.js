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
  images: {
    src: [`${srcFolder}/images/**/*`, `!${srcFolder}/images/sprites/*.svg`, `!${srcFolder}/images/favicon/*.*`],
    dist: `${buildFolder}images/`,
    watch: `${srcFolder}/images/**/*`,
  },
  sprites: {
    src: `${srcFolder}/images/sprites/*.svg`,
    dist: `${buildFolder}/images/sprites`,
    watch: `${srcFolder}/images/sprites/*.svg`,
  },
  fonts: {
    src: `${srcFolder}/fonts/`,
    fonts: `${srcFolder}/scss/base/_fonts.scss`,
    dist: `${buildFolder}/fonts/`,
  },
  srcFolder,
  buildFolder,
  projectDirName: path.basename(path.resolve()),
  ftp: '',
};

export default filePaths;
