function processImage(inImg) {
    const width = inImg.width;
    const height = inImg.height;
    const src = new Uint32Array(inImg.data.buffer);
    const isValueHistogram = $("#typeValue").prop('checked');
    
    let histBrightness = (new Array(256)).fill(0);
    let histR = (new Array(256)).fill(0);
    let histG = (new Array(256)).fill(0);
    let histB = (new Array(256)).fill(0);
    for (let i = 0; i < src.length; i++) {
      let r = src[i] & 0xFF;
      let g = (src[i] >> 8) & 0xFF;
      let b = (src[i] >> 16) & 0xFF;
      histBrightness[r]++;
      histBrightness[g]++;
      histBrightness[b]++;
      histR[r]++;
      histG[g]++;
      histB[b]++;
    }
    
    let maxBrightness = 0;
    if (isValueHistogram) {
      for (let i = 1; i < 256; i++) {
        if (maxBrightness < histBrightness[i]) {
          maxBrightness = histBrightness[i]
        }
      }
    } else {
      for (let i = 0; i < 256; i++) {
        if (maxBrightness < histR[i]) {
          maxBrightness = histR[i]
        } else if (maxBrightness < histG[i]) {
          maxBrightness = histG[i]
        } else if (maxBrightness < histB[i]) {
          maxBrightness = histB[i]
        }
      }
    }
    
    const canvas = document.getElementById('canvasHistogram');
    const ctx = canvas.getContext('2d');
    let guideHeight = 8;
    let startY = (canvas.height - guideHeight);
    let dx = canvas.width / 256;
    let dy = startY / maxBrightness;
    ctx.lineWidth = dx;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < 256; i++) {
      let x = i * dx;
      if (isValueHistogram) {
        // Value
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, startY - histBrightness[i] * dy);
        ctx.closePath();
        ctx.stroke(); 
      } else {
        // Red
        ctx.strokeStyle = "rgba(220,0,0,0.5)";
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, startY - histR[i] * dy);
        ctx.closePath();
        ctx.stroke(); 
        // Green
        ctx.strokeStyle = "rgba(0,210,0,0.5)";
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, startY - histG[i] * dy);
        ctx.closePath();
        ctx.stroke(); 
        // Blue
        ctx.strokeStyle = "rgba(0,0,255,0.5)";
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, startY - histB[i] * dy);
        ctx.closePath();
        ctx.stroke(); 
      }
      // Guide
      ctx.strokeStyle = 'rgb(' + i + ', ' + i + ', ' + i + ')';
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, canvas.height);
      ctx.closePath();
      ctx.stroke(); 
    }
  }
  
  function getImageData(el) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = document.getElementById(el);
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    return context.getImageData(0, 0, img.width, img.height);
  }
  
  document.getElementById('input').addEventListener('change', function() {
    if (this.files && this.files[0]) {
      var img = document.getElementById('img');
      img.src = URL.createObjectURL(this.files[0]);
      img.onload = update;
    }
  });
  
  $('input[name="rType"]').on('click change', update);
  
  function update(e) {
    processImage(getImageData('img'));
  }
  
  update();