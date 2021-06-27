let canv = document.getElementById('canvas');
let context = canv.getContext('2d');

loadImage('https://api.allorigins.win/raw?url=http://xhr-server.herokuapp.com/files/1623749866448697652035453.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');

function loadButtonClick() {
  let input = document.getElementById('input');
  let src = input.value;
  input.value = '';
  loadImage(src);
}

function loadImage(src) {
  const image = new Image();
  image.crossOrigin = "Anonymous";
  image.src = src;
  console.log(src);
  image.onload = function () {
    let imgWidth = image.naturalWidth;
    let imgHeight = image.naturalHeight;
    let screenWidth = 500;
    let screenHeight = 500;
    let scaleX = 0;
    let scaleY = 0;
    console.log("width",imgWidth,"height",imgHeight)
    if (imgWidth > screenWidth)
    scaleX = screenWidth / imgWidth;
    console.log(scaleX,"scaleX");//

    if (imgHeight > screenHeight)
    scaleY = screenHeight / imgHeight;
    console.log(scaleY,"scaleY");

    var scale = screenHeight / imgHeight;//scaleY
    console.log(scale,"scale");
    if (scaleX < scaleY)
    scale = scaleY;//scaleX
    console.log(scale,"scale=scaleX");/// 0
    if (scale < 1) {
      imgHeight = imgHeight * scale;
      imgWidth = imgWidth * scale;
    }
    console.log(imgHeight,imgWidth)
    canv.height = imgHeight;
    canv.width = imgWidth;
    console.log(canv);

    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, imgWidth, imgHeight);
    loadHistogram(canv);
  };
}

function colorArray() {
  let arr = [];
  for (let i = 0; i < 256; i++) {if (window.CP.shouldStopExecution(0)) break;
    arr[i] = 0;
  }window.CP.exitedLoop(0);
  return arr;
}

function histogramData() {
  return {
    red: colorArray(),
    green: colorArray(),
    blue: colorArray() };

}

function getHistogramValues(canvas) {
  let data = histogramData();
  console.log(canvas.width,canvas.height);
  let pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;

  for (let i = 0, n = pixels.length; i < n; i += 4) {if (window.CP.shouldStopExecution(1)) break;
    let redVal = pixels[i];
    let greenVal = pixels[i + 1];
    let blueVal = pixels[i + 2];
    // i+3 is alpha
    data.red[redVal]++;
    data.green[greenVal]++;
    data.blue[blueVal]++;
  }window.CP.exitedLoop(1);

  return data;
}

function loadHistogram(canvas) {
  let vals = getHistogramValues(canvas);
  let histCanvas = document.getElementById('histogram');
  drawHistogram(histCanvas, vals);
}

function drawHistogram(canvas, data, x, y, width, height) {
  canvas.width = canvas.scrollWidth * window.devicePixelRatio;
  canvas.height = canvas.scrollHeight * window.devicePixelRatio;
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let max = Math.max.apply(null, data.red.concat(data.green, data.blue));
  drawColorGraph(canvas, max, data.red, '#FF0000', x, y, width, height);
  drawColorGraph(canvas, max, data.green, '#00FF00', x, y, width, height);
  drawColorGraph(canvas, max, data.blue, '#0000FF', x, y, width, height);
}

function drawColorGraph(canvas, max, vals, color, x, y, width, height) {
  const ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = 'screen';
  const graphHeight = height || canvas.height;
  const graphWidth = width || canvas.width;
  const graphX = x || 0;
  const graphY = y || canvas.height;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(graphX, graphHeight);
  vals.forEach((val, i) => {
    let drawHeight = Math.round(val / max * graphHeight);
    let drawX = graphX + graphWidth / 255 * i;
    let drawY = graphY - drawHeight;
    ctx.lineTo(drawX, drawY);
    // ctx.fillRect(drawX, graphY, 0.5, percent * graphHeight)
  });
  ctx.lineTo(graphX + graphWidth, graphY);
  ctx.closePath();
  ctx.fill();
}



function getGraphPath(max, vals, x, y, width, height) {
  const graphHeight = 100;
  const graphWidth = 255;
  const graphX = 0;
  const graphY = 100;

  let path = pathMoveTo(graphX, graphHeight);
  vals.forEach((val, i) => {
    // round to 0.5 increments
    let drawHeight = Math.round(val / max * graphHeight * 2) / 2;
    let drawX = graphX + graphWidth / 255 * i;
    let drawY = graphY - drawHeight;
    path += pathLineTo(drawX, drawY);
  });
  path += pathLineTo(graphX + graphWidth, graphY);
  path += "Z";
  return path;
}

function pathMoveTo(x, y) {
  return "M " + x + " " + y + " ";
}

function pathLineTo(x, y) {
  return "L " + x + " " + y + " ";
}

