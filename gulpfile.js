import pkg from 'gulp';
import filePaths from './gulp/config/paths.js';
import clean from './gulp/tasks/clean.js';
import serve from './gulp/tasks/serve.js';
import html from './gulp/tasks/html.js';
import styles from './gulp/tasks/styles.js';
import scripts from './gulp/tasks/scripts.js';
import images from './gulp/tasks/images.js';
import sprites from './gulp/tasks/sprites.js';
import { font, fontStyle } from './gulp/tasks/fonts.js';
import favicons from './gulp/tasks/favicons.js';
import resources from './gulp/tasks/resources.js';
import zip from './gulp/tasks/zip.js';
import deploy from './gulp/tasks/deploy.js';

const { parallel, series, watch } = pkg;
const isBuild = process.argv.includes('--build');
const handleHTML = html.bind(null, isBuild);
const handleStyles = styles.bind(null, isBuild);
const handleScripts = scripts.bind(null, !isBuild);
const handleImages = images.bind(null, isBuild);

const watcher = () => {
  watch(filePaths.html.watch, handleHTML);
  watch(filePaths.styles.watch, handleStyles);
  watch(filePaths.scripts.watch, handleScripts);
  watch(filePaths.images.watch, handleImages);
  watch(filePaths.sprites.watch, sprites);
  watch(filePaths.resources.watch, resources);
};

const server = parallel(watcher, serve);

const dev = series(
  clean,
  parallel(
    handleHTML,
    handleStyles,
    handleScripts,
    handleImages,
    sprites,
    series(font, fontStyle),
    favicons,
    resources,
  ),
  parallel(server),
);

const prod = series(
  clean,
  parallel(
    handleHTML,
    handleStyles,
    handleScripts,
    handleImages,
    sprites,
    series(font, fontStyle),
    favicons,
    resources,
  ),
);

const deployZIP = series(prod, zip);
const deployFTP = series(prod, deploy);

export { prod, deployZIP, deployFTP };

export default dev;
