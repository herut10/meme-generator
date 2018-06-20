'use strict'
var gElCanvas;
var gCtx;


function initCanvas() {
    gElCanvas = document.querySelector('.meme-canvas')
    // setCanvasDimensions(100, 100)
    console.log(gElCanvas.width);
    gCtx = gElCanvas.getContext('2d')
}

function setCanvasDimensions(width, height) {
    gElCanvas.height = height
    gElCanvas.width = width
}


function drawImageCanvas() {
    var meme = getGMeme();

    if (meme) {
        var img = new Image;
        img.src = `/img/${meme.selectedImgId}.jpg`;

        var newWidth = window.innerWidth * 0.7;
        var newHeight = newWidth * (img.height / img.width);
        setCanvasDimensions(newWidth, newHeight);
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawTextLineCanvas() {
    var meme = getGMeme();
    meme.txts.forEach(function (txt, idx) {
        gCtx.font = `${txt.size}em impact`;
        gCtx.fillStyle = txt.color
        gCtx.textAlign = "center";
        if (idx === 0) {
            gCtx.fillText(txt.line, gElCanvas.width / 2, gElCanvas.height * 0.15);
            gCtx.strokeText(txt.line, gElCanvas.width / 2, gElCanvas.height * 0.15); //top
        } else if (idx === 1) {
            gCtx.fillText(txt.line, gElCanvas.width / 2, gElCanvas.height * 0.85);
            gCtx.strokeText(txt.line, gElCanvas.width / 2, gElCanvas.height * 0.85); //bottom
        } else {
            gCtx.fillText(txt.line, gElCanvas.width / 2, gElCanvas.height * 0.5);
            gCtx.strokeText(txt.line, gElCanvas.width / 2, gElCanvas.height * 0.5); //middle
        }
    });
}