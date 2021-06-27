var Jimp = require('jimp');
 
// open a file called "lenna.png"
Jimp.read('https://api.allorigins.win/raw?url=https://thumbs-prod.si-cdn.com/DTC0Tm-OasgkRvO_yQgsytW-sE0=/fit-in/1600x0/https://public-media.si-cdn.com/filer/04/8e/048ed839-a581-48af-a0ae-fac6fec00948/gettyimages-168346757_web.jpg', (err, lenna) => {
  if (err) throw err;
  lenna
    .resize(256, 256) // resize
    .quality(60) // set JPEG quality
    .greyscale() // set greyscale
    .write('output3.jpg'); // save
});