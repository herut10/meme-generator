'use strict'


var gElCanvas;
var gCtx;
var gSelectedTextIdx;

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
        console.log(img.height);
        console.log(img.width);
        
        img.src = `img/${meme.selectedImgId}.jpg`;
        var newWidth = Math.min(window.innerWidth, window.innerHeight) * 0.9
        var newHeight = newWidth * (img.height / img.width)
        setCanvasDimensions(newWidth, newHeight);
        gCtx.drawImage(img, 0, 0, newWidth, newHeight)
    }
}

function drawCanvas() {
    drawImageCanvas();
    drawTextLineCanvas();
    displaySelected()
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
        gCtx.font = `${txt.bold} ${txt.size}em ${txt.font}`;
        gCtx.fillStyle = txt.color
        gCtx.textAlign = "center";
        gCtx.shadowBlur = (txt.shadow) ? 10 : 0;
        gCtx.shadowOffsetX = (txt.shadow) ? 5 : 0;
        gCtx.shadowOffsetX = (txt.shadow) ? 5 : 0;
        gCtx.strokeStyle = "black";
        gCtx.shadowColor = "black";
        gCtx.lineWidth = 3;
        gCtx.fillText(txt.line, txt.xPosition, txt.yPosition);
        gCtx.strokeText(txt.line, txt.xPosition, txt.yPosition);
    });
}

function getLineDimenstions(txt) {
    gCtx.font = `${txt.bold} ${txt.size}em ${txt.font}`;
    gCtx.fillStyle = txt.color
    gCtx.textAlign = "center";
    gCtx.shadowBlur = (txt.shadow) ? 15 : 0;
    gCtx.shadowColor = 'rgba(0,0,0,1)';
    return {
        width: gCtx.measureText(txt.line).width,
        height: txt.size * 11.3
    }
}

function getDateUrlCanvas() {
    return gElCanvas.toDataURL();
}




function getCanvasPos() {

    var _x = gElCanvas.offsetLeft;
    var _y = gElCanvas.offsetTop;
    var tempCanvas = gElCanvas.cloneNode(true)
    while (tempCanvas = tempCanvas.offsetParent) {
        _x += tempCanvas.offsetLeft - gElCatempCanvasnvas.scrollLeft;
        _y += tempCanvas.offsetTop - tempCanvas.scrollTop;
    }
    return {
        left: _x,
        top: _y
    }
};

function mousePos(ev) {
    var canvasPos = getCanvasPos(ev.target)
    var elHeader = document.querySelector('.header-page')
    var mouseX = ev.clientX - canvasPos.left + window.pageXOffset;
    var mouseY = ev.clientY - canvasPos.top + window.pageYOffset;
    return {
        x: mouseX,
        y: mouseY - elHeader.clientHeight
    };
};



function clickOnText(ev) {
    drawCanvas()
    var mousePosition = mousePos(ev)
    var meme = getGMeme()
    gSelectedTextIdx = meme.txts.findIndex(function (txt) {
        var txtDimensions = getLineDimenstions(txt)
        if (mousePosition.y <= txt.yPosition && mousePosition.y >= txt.yPosition - txtDimensions.height &&
            mousePosition.x >= txt.xPosition - txtDimensions.width / 2 && mousePosition.x <= txt.xPosition + txtDimensions.width / 2) {
            return true
        }
    })
    if (gSelectedTextIdx >= 0) {
        displaySelected()
    }

}

function isMouseOverText(ev) {
    var mousePosition = mousePos(ev)
    var meme = getGMeme()
    return meme.txts.some(function (txt) {
        var txtDimensions = getLineDimenstions(txt)
        if (mousePosition.y <= txt.yPosition && mousePosition.y >= txt.yPosition - txtDimensions.height &&
            mousePosition.x >= txt.xPosition - txtDimensions.width / 2 && mousePosition.x <= txt.xPosition + txtDimensions.width / 2) {
            return true
        }
    })
}

function getSelectedTextIdx() {
    return gSelectedTextIdx
}

function getSelectedText() {
    var meme = getGMeme()
    return meme.txts[gSelectedTextIdx]
}

function clearChoseText() {
    gSelectedTextIdx = -1
}

function displaySelected() {
    var meme = getGMeme()
    if (gSelectedTextIdx >= 0) {
        var txtDimensions = getLineDimenstions(meme.txts[gSelectedTextIdx])
        var currText = meme.txts[gSelectedTextIdx]
        gCtx.rect(currText.xPosition - txtDimensions.width / 2, currText.yPosition - txtDimensions.height, txtDimensions.width, txtDimensions.height);
        gCtx.stroke();
    }

}