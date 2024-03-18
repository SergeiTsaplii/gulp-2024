import pkg from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import plugins from '../config/plugins.js';
import filePaths from '../config/paths.js';
import logger from '../config/loger.js';

const { src, dest } = pkg;

// const spriteConfig = {
//   mode: {
//     symbol: {
//       sprite: '../sprite.svg',
//     },
//   },
//   shape: {
//     transform: [
//       {
//         svgo: {
//           js2svg: { indent: 2, pretty: isBuild },
//           plugins: [
//             {
//               name: 'removeAttrs',
//               params: {
//                 attrs: '(fill|stroke)',
//               },
//             },
//           ],
//         },
//       },
//     ],
//   },
// };

const sprites = (isBuild) => src(filePaths.sprites.src)
  .pipe(logger.handleError('SPRITES'))
  .pipe(svgSprite({
    mode: {
      symbol: {
        sprite: '../sprite.svg',
      },
    },
    shape: {
      transform: [
        {
          svgo: {
            js2svg: { indent: 2, pretty: isBuild },
            plugins: [
              // {
              //   name: 'removeAttrs',
              //   params: {
              //     attrs: '(fill|stroke)',
              //   },
              // },
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      ],
    },
  }))
  .pipe(dest(filePaths.sprites.dist))
  .pipe(plugins.browserSync.stream());

export default sprites;
