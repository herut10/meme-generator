'use strict'

var IMG_COUNT = 25;
var gImgs;
var gMeme;
var gFilterBy;
var gPopularKeywords;

function initMemeService() {
    gFilterBy = 'All';
    createImgs();
    createPopularKeywords();
}

function createPopularKeywords() {
    gPopularKeywords = [];
    gImgs.forEach(function (img) {
        img.keywords.forEach(function (keyword) {
            var findKeyword = gPopularKeywords.find(function (item) {
                return item.keyword === keyword;
            });
            if (!findKeyword) {
                gPopularKeywords.push({
                    keyword: keyword,
                    count: 0
                });
            }
        });
    });
    console.log(gPopularKeywords);
}

function updatePopKeywordsBySearch(keyword) {
    if (keyword !== 'All') {
        gPopularKeywords.forEach(function (item) {
            if (item.keyword === keyword) {
                item.count++;
            }
        });
        console.log(gPopularKeywords);
    }
}

function updatePopKeywordsBySelect() {
    var keywords = gImgs[getIndexImgById(gMeme.selectedImgId)].keywords;
    keywords.forEach(function (keyword) {
        gPopularKeywords.forEach(function (item) {
            if (item.keyword === keyword) {
                item.count++;
            }
        });
    });
    console.log(gPopularKeywords);
}

function getIndexImgById(idImg) {
    var index = gImgs.findIndex(function (img) {
        return img.id === idImg
    });
    return index;
}

function createImgs() {
    gImgs = [];
    for (var i = 0; i < IMG_COUNT; i++) {
        gImgs.push(createImg())
    }
    gImgs[0].keywords = ['Political', 'Nice'];
    gImgs[1].keywords = ['Tv'];
    gImgs[2].keywords = ['Political'];
    gImgs[3].keywords = ['Animal'];
    gImgs[4].keywords = ['Baby', 'Funny'];
    gImgs[5].keywords = ['Baby'];
    gImgs[6].keywords = ['Animal'];
    gImgs[7].keywords = ['Movies'];
    gImgs[8].keywords = ['Baby'];
    gImgs[9].keywords = ['Tv'];
    gImgs[10].keywords = ['Tv'];
    gImgs[11].keywords = ['Tv'];
    gImgs[12].keywords = ['Movies', 'Nice'];
    gImgs[13].keywords = ['Baby', 'Funny'];
    gImgs[14].keywords = ['Political'];
    gImgs[15].keywords = ['Baby'];
    gImgs[16].keywords = ['Animal'];
    gImgs[17].keywords = ['Political'];
    gImgs[18].keywords = ['Sport'];
    gImgs[19].keywords = ['Movies', 'Funny'];
    gImgs[20].keywords = ['Movies', 'Nice'];
    gImgs[21].keywords = ['Movies'];
    gImgs[22].keywords = ['Tv'];
    gImgs[23].keywords = ['Movies'];
    gImgs[24].keywords = ['Movies', 'Toys'];
}

function createImg() {
    return {
        id: gImgs.length + 1,
        url: `img/${gImgs.length + 1}.jpg`,
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

function addNewText(id, txt, color, size, xPosition, yPosition) {
    gMeme.txts.push(createText(id, txt, color, size, xPosition, yPosition))
}

function createText(id, txt, color, size, xPosition, yPosition) {
    return {
        idLine: id,
        line: txt,
        size: size,
        align: 'center',
        color: color,
        bold: 'normal',
        shadow: false,
        xPosition: xPosition,
        yPosition: yPosition,
    }
}

function updateText(txt, color, index, xPosition, yPosition) {
    if (txt) {
        gMeme.txts[index].line = txt;
    }
    if (color) {
        gMeme.txts[index].color = color;
    }
    if (xPosition) {
        gMeme.txts[index].xPosition = xPosition
        gMeme.txts[index].yPosition = yPosition
    }

}

function getGMeme() {
    return gMeme;
}

function getImagesToDisplay() {
    if (gFilterBy === 'All') {
        return gImgs
    }
    return gImgs.filter(function (img) {
        return img.keywords.includes(gFilterBy);
    });
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

function setSizeLine(id, diff) {
    gMeme.txts[getLineIndexById(id)].size += diff
}

function setBoldToLineText(idLine) {
    var index = getLineIndexById(idLine);
    if (gMeme.txts[index].bold === 'normal') {
        gMeme.txts[index].bold = 'bold';
    } else {
        gMeme.txts[index].bold = 'normal';
    }
}

function setShadowToLineText(idLine) {
    var index = getLineIndexById(idLine);
    gMeme.txts[index].shadow = !(gMeme.txts[index].shadow);
}