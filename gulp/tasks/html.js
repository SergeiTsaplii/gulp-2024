import pkg from 'gulp';
import fileinclude from 'gulp-file-include';
import avifWebpHtml from 'gulp-avif-webp-lazyload';
import htmlMin from 'gulp-htmlmin';
import plugins from '../config/plugins.js';
import filePaths from '../config/paths.js';
import logger from '../config/loger.js';

const { src, dest } = pkg;

const html = (isBuild) => src(filePaths.html.src)
  .pipe(logger.handleError('HTML'))
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file',
  }))
  .pipe(plugins.replace(/(?<=src=|href=|srcset=)(['"])(\.(\.)?\/)*(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\\/'"]+(\/))?([^'"]*)\1/gi, '$1./$4$5$7$1'))
  .pipe(plugins.if(isBuild, plugins.replace('.css', '.min.css')))
  .pipe(plugins.if(isBuild, plugins.replace('.js', '.min.js')))
  .pipe(plugins.if(isBuild, avifWebpHtml()))
  .pipe(
    htmlMin({
      useShortDoctype: true,
      sortClassName: true,
      removeComments: isBuild,

      /** Раскомментировать если требуется минификация html */
      // collapseWhitespace: isBuild,
    }),
  )
  .pipe(dest(filePaths.html.dist))
  .pipe(plugins.browserSync.stream());

export default html;
