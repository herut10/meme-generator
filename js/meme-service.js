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


function addNewText(txt, color, size) {
    console.log(txt);
    gMeme.txts.push(createText(txt, color, size))
}

function updateText(txt, color, size, idInput) {
    gMeme.txts[idInput].line = txt;
    gMeme.txts[idInput].color = color;
    gMeme.txts[idInput].size = size;
}

function createText(txt, color, size) {
    return {
        line: txt,
        size: size,
        align: 'center',
        color: color
    }
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
        url: `img/${gImgs.length + 1}.jpg`,
        keywords: getRandomTags()
    };
}

function getRandomTags() {
    var tags = gTags.slice();
    var resTags = []
    var tagCount = getRandInt(1, tags.length) //at least one tag
    for (let i = 0; i < tagCount; i++) {
        var idx = getRandInt(1, tags.length)
        resTags.push(tags.splice(idx))
    }
    return resTags
}

function getGMeme() {
    return gMeme
}

//TODO: add filter
function getImagesToDisplay() {
    return gImgs
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