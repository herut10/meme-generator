'use strict'

var IMG_COUNT = 25;
var gImgs;
var gFilterBy
var gTags;
var gMeme;


function initMemeService() {
    gTags = ['nice', 'funny', 'political'];
    gFilterBy = 'all';
    createImgs();
}

function createImgs() {
    gImgs = [];
    for (var i = 0; i < IMG_COUNT; i++) {
        gImgs.push(createImg())
    }
}

function createImg() {
    return {
        id: gImgs.length + 1,
        url: `img/${gImgs.length + 1}.jpg`
        // keywords: getRandomTags()
    };
}

function getLineIndexById(idLine) {
    var index = gMeme.txts.findIndex(function (line) {
        return line.idLine === idLine
    });
    return index;
}

function removeLineFromMeme(idInput) {
    gMeme.txts.splice(getLineIndexById(idInput), 1);
}

function isLineExist(idInput) {
    return gMeme.txts[getLineIndexById(idInput)] !== undefined;
}

function addNewText(id, txt, color, size) {
    gMeme.txts.push(createText(id, txt, color, size))
}

function createText(id, txt, color, size) {
    return {
        idLine: id,
        line: txt,
        size: size,
        align: 'center',
        color: color,
        bold: 'normal'
    }
}

function setBoldToLineText(idLine) {
    var index = getLineIndexById(idLine);
    if (gMeme.txts[index].bold === 'normal') {
        gMeme.txts[index].bold = 'bold';
    } else {
        gMeme.txts[index].bold = 'normal';
    }
}

function updateText(txt, color, index) {
    gMeme.txts[index].line = txt;
    gMeme.txts[index].color = color;

}

function setSizeLine(id, diff) {
    gMeme.txts[getLineIndexById(id)].size += diff
}

function getGMeme() {
    return gMeme;
}

//TODO: add filter
function getImagesToDisplay() {
    return gImgs;
}

function getCountText() {
    return gMeme.txts.length;
}

function setMemeSelected(id) {
    gMeme = {
        selectedImgId: id,
        txts: []
    }
}

function setFilterBy(keyword) {
    gFilterBy = keyword;
}