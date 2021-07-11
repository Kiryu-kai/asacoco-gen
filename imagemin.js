const imagemin = require('imagemin-keep-folder');
const imageminPngquant = require('imagemin-pngquant');

imagemin(['./build/static/media/**/*.png'], {
  plugins: [
    imageminPngquant({
      quality: [0.6, 0.8],
    }),
  ],
}).then((files) => {
  console.log(files);
  console.log('Images optimized');
});
