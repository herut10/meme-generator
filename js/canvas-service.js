'use strict'
var gElCanvas;
var gCtx;

function initCanvas() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
}


function drawImageCanvas() {
    var meme = getGMeme()
    if (meme) {
        var img = new Image;
        console.log(meme);
        
        img.src = `/img/${meme.selectedImgId}.jpg`;
        console.log(img);
        
        gCtx.drawImage(img,0,0,gElCanvas.width,gElCanvas.height)
    } else {
        console.log('something went wrong getting meme');
    }
}

function drawTextLineCanvas() {
    var meme = getGMeme();
    meme.txts.array.forEach(function (txt) {
        ctx.font = `${txt.size}px impact`;
        ctx.fillText(txt.line, txt.xPosition,txt.yPosition);
        ctx.strokeText(txt.line, txt.xPosition,txt.yPosition);
    });
}