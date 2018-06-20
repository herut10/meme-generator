'use strict'

var gImgCount = 25;
var gImgs;
var gFilterBy


var gMeme;


function getGMeme() {
    return gMeme
}



function initMemeService() {
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




function createImgs() {
    gImgs = [];
    for (var i = 0; i < gImgCount; i++) {
        gImgs.push(createImg())

    }
}




function createImg() {
    return {
        id: gImgs.length + 1,
        url: `img/${gImgs.length + 1}.jpg`,
        keywords: []
    };
}