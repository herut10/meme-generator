'use strict'

var gImgCount = 25;
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


function createText(txt) {

    return {

        line: txt,
        size: 20,
        align: 'left',
        color: 'white',
        xPosition: 0,
        yPosition: 0
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