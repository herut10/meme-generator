'use strict'

var IMG_COUNT = 25;
var gImgs;
var gFilterBy
var gTags;
var gMeme;


function getGMeme() {
    return gMeme
}

function initMemeService() {
    gTags = ['nice', 'funny', 'political']
    gFilterBy = 'all'
    createImgs()
}

//TODO: add filter
function getImagesToDisplay() {
    return gImgs
}

function setMemeSelected(id) {
    gMeme = {
        selectedImgId: id,
        txts: []
    }
}

function addNewText(txt) {
    gMeme.txts.push(createText(txt))
}

function createText(txt) {
    return {
        line: txt,
        size: 6,
        align: 'center',
        color: 'white'
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