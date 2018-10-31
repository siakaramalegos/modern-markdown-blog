const glob = require('glob')
const sharp = require('sharp')

function processSize(size, filename, path) {
  const resizeConfig = sharp(path).resize(size)

  resizeConfig
    .toFile(`./src/images/${size}_${filename}`)
    .then(() => {
      console.log(`Resized ${filename} to ${size}px`);
    })
    .catch(err => {
      console.error(err);
    })

  resizeConfig
    .webp()
    .toFile(`./src/images/${size}_${filename}.webp`)
    .then(() => {
      console.log(`Converted ${filename} to ${size}px webp`);
    })
    .catch(err => {
      console.error(err);
    })
}

function processImages() {
  // Generate image sets
  glob('**/*.jpg', { cwd: './src/images/originals/' }, function (err, files) {
    if (err) throw err

    // Construct image files for each image
    files.forEach((file) => {
      const path = `./src/images/originals/${file}`

      processSize(300, file, path)
      processSize(600, file, path)

    }, function (err, stdout, stderr) {
      if (err) throw err;
    });
  })
}

module.exports.processImages = processImages
