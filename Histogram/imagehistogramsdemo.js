function createHistograms()
{
    const Jimp = require("jimp");
    const imghist = require('./imagehistograms.js');

    Jimp.read("https://thumbs-prod.si-cdn.com/DTC0Tm-OasgkRvO_yQgsytW-sE0=/fit-in/1600x0/https://public-media.si-cdn.com/filer/04/8e/048ed839-a581-48af-a0ae-fac6fec00948/gettyimages-168346757_web.jpg", function (err, photo)
    {
        if (err)
        {
            console.error(err);
        }
        else
        {
            const histred = imghist.histogramRGB(imghist.colorChannels.Red, photo);
            saveHistogram(histred, "histred.svg");

            const histgreen = imghist.histogramRGB(imghist.colorChannels.Green, photo);
            saveHistogram(histgreen, "histgreen.svg");

            let histblue = imghist.histogramRGB(imghist.colorChannels.Blue, photo);
            saveHistogram(histblue, "histblue.svg");
        }
    });
}


function saveHistogram(histogramstring, filename)
{
    const fs = require("fs");

    fs.writeFile(filename, histogramstring, function (err)
    {
        if (err)
        {
            console.error(err);
        }
        else
        {
            console.log(filename + ' saved');
        }
    });
}


createHistograms();