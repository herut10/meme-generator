'use strict'


var gElCanvas;
var gCtx;

function initCanvas() {
    gElCanvas = document.querySelector('.meme-canvas');
    gCtx = gElCanvas.getContext('2d');

}

function setCanvasDimensions(width, height) {
    gElCanvas.height = height;
    gElCanvas.width = width;
}


function drawImageCanvas() {
    var meme = getGMeme();

    if (meme) {
        var img = new Image;
        img.src = `/img/${meme.selectedImgId}.jpg`;
        var newWidth = Math.min(window.innerWidth, window.innerHeight) * 0.9
        var newHeight = newWidth * (img.height / img.width)
        setCanvasDimensions(newWidth, newHeight);
        gCtx.drawImage(img, 0, 0, newWidth, newHeight)
    }
}

function drawCanvas() {
    drawImageCanvas();
    drawTextLineCanvas();
}

function getCanvasDimensions() {
    return {
        width: gElCanvas.width,
        height: gElCanvas.height
    }
}

function drawTextLineCanvas() {
    var meme = getGMeme();
    meme.txts.forEach(function (txt, idx) {
        gCtx.font = `${txt.bold} ${txt.size}em impact`;
        gCtx.fillStyle = txt.color
        gCtx.textAlign = "center";
        gCtx.shadowBlur = (txt.shadow) ? 15 : 0;
        gCtx.shadowColor = 'rgba(0,0,0,1)';
        gCtx.fillText(txt.line, txt.xPosition, txt.yPosition);
        gCtx.strokeText(txt.line, txt.xPosition, txt.yPosition); 
    });
}

function getLineWidth(txt) {
    return gCtx.measureText(txt).width
}

function getDateUrlCanvas() {
    return gElCanvas.toDataURL();
}