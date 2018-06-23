'use strict'

var prevMousePosition;

function initMain() {
    initCanvas();
    initMemeService();
    renderImages();
    renderPopularKeywords();
}

function renderPopularKeywords() {
    var keywords = getPopularKeywords();
    var strHtml = '';
    strHtml = keywords.map(function (keyword) {
        return `<h1 style="font-size: ${10 * (keyword.count+1)}px">${keyword.keyword}</h1>`;
    }).join('');

    document.querySelector('.popular-Keywords-container').innerHTML = strHtml;
    console.log(keywords);
}

function renderImages() {
    var imgs = getImagesToDisplay();
    var strHtml = '';

    strHtml = imgs.map(function (img) {
        return `
        <div class="hexagon hexagon1">
        <div class="hexagon-in1 ">
            <div style="background-image:url(/img/${img.id}.jpg)" class="hexagon-in2 " onclick="onClickImage(${img.id})"></div>
        </div>
    </div>`
    }).join('');
    document.querySelector('.images-container').innerHTML = strHtml;
}

function onClickImage(idMeme) {
    setTimeout(() => {
        document.querySelector('.meme-editor').classList.toggle('none');
    }, 100);
    document.querySelector('.image-chooser').classList.toggle('none');
    setMemeSelected(idMeme);
    updatePopKeywordsBySelect();
    drawImageCanvas();
    onAddLineText();
    renderPopularKeywords();
}

function onChangeStyleText(idInput) {
    var txt = document.querySelector(`.line-text-${idInput}`).value;
    var color = document.querySelector(`#color-text-${idInput}`).value;
    // var size = document.querySelector(`.select-font-size-${idInput}`).value;
    if (txt) {
        drawImageCanvas();
        var dimensions = getCanvasDimensions()
        var indexLine = getLineIndexById(idInput);
        var linesCount = getCountText();
        if (indexLine === -1) {
            if (linesCount === 0) {
                addNewText(idInput, txt, color, 5, dimensions.width / 2, dimensions.height * 0.15);
            } else if (linesCount === 1) {
                addNewText(idInput, txt, color, 5, dimensions.width / 2, dimensions.height * 0.85);
            } else {
                addNewText(idInput, txt, color, 5, dimensions.width / 2, dimensions.height * 0.5);
            }
            onAddLineText();
        } else {
            updateText(txt, color, indexLine);
        }
        drawTextLineCanvas();
    }
}

function onCloseEditor() {
    document.querySelector(".lines-edit").innerHTML = '';

    setTimeout(() => {
        document.querySelector('.meme-editor').classList.toggle('none');
    }, 100);
    document.querySelector('.image-chooser').classList.toggle('none');
}

function onDownloadMeme(elLink) {
    elLink.href = getDateUrlCanvas();
    elLink.download = 'My-Meme.jpg';
    onCloseEditor();
}

function onChangeSize(ev, id, diff) {
    if (isLineExist(id)) {
        setSizeLine(id, diff)
        onChangeStyleText(id)
    }
}

function onDeleteText(ev, idInput) {
    ev.stopPropagation();

    if (isLineExist(idInput)) {
        removeLineFromMeme(idInput);
        var nodeToRemove = document.querySelector(`.add-line-menu-${idInput}`);
        document.querySelector(".lines-edit").removeChild(nodeToRemove);
        drawCanvas();
    }
}

function onTextClick(ev) {
    prevMousePosition = mousePos(ev)
    clickOnText(ev)
}

function onDragText(ev) {
    var mouseposition = mousePos(ev)
    if (isMouseOverText(ev)) {
        document.querySelector('.meme-canvas').style = 'cursor: pointer;'
    } else {
        document.querySelector('.meme-canvas').style = 'cursor: default;'
    }
    var selectedTextIdx = getSelectedTextIdx()
    if (selectedTextIdx >= 0) {
        var mousePosXDiff = mouseposition.x - prevMousePosition.x
        var mousePosYDiff = mouseposition.y - prevMousePosition.y
        prevMousePosition = mouseposition
        var text = getSelectedText()
        updateText(null, null, selectedTextIdx, text.xPosition + mousePosXDiff, text.yPosition + mousePosYDiff)
        drawCanvas()
    }
}

function onClearChosenText() {
    clearChoseText()
    drawCanvas()
}

function onAddLineText() {
    var newIdLine = makeId(4);

    var strHTML = `     <div class="selection-style-text animated bounceInRight">
                            <input class="input-line-txt line-text-${newIdLine}" onkeyup="onChangeStyleText('${newIdLine}')" type="text" placeholder="Enter text" required>
                            <button class="btn btn-increase-size" onclick="onChangeSize(event,'${newIdLine}',1)"><i class="fa fa-font"></i><i class="fa fa-arrow-up"></i></button>
                            <button class="btn btn-decrease-size" onclick="onChangeSize(event,'${newIdLine}',-1)"><i class="fa fa-font"></i><i class="fa fa-arrow-down"></i></button>
                            <button class="btn btn-bold btn-bold-${newIdLine}" onclick="onBoldText(event,'${newIdLine}')"><i class="fa fa-bold bold-select"></i></button>
                            <button class="btn btn-shadow btn-shadow-${newIdLine}" onclick="onShadowText(event,'${newIdLine}')">s</button>
                            <input onchange="onChangeStyleText('${newIdLine}')" type="color" id="color-text-${newIdLine}" name="color" value="#ffffff"  />
                        </div>
                        <div class="btns-actions-text animated bounceInRight">
                            <button class="btn btn-delete-text-${newIdLine}" onclick="onDeleteText(event,'${newIdLine}')">
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>`;

    var node = document.createElement("div");
    node.classList.add('add-line-menu', `add-line-menu-${newIdLine}`, 'flex');
    node.innerHTML = strHTML;
    document.querySelector(".lines-edit").appendChild(node);
}

function onShadowText(event, idLine) {
    if (isLineExist(idLine)) {
        setShadowToLineText(idLine);
        document.querySelector(`.btn-shadow-${idLine}`).classList.toggle('choose-btn');
        drawCanvas();
    }
}

function onBoldText(event, idLine) {
    if (isLineExist(idLine)) {
        setBoldToLineText(idLine);
        document.querySelector(`.btn-bold-${idLine}`).classList.toggle('choose-btn');
        drawCanvas();
    }
}

function onChangekeywordFilter() {
    var newKeywordFilter = document.querySelector('.select-keyword-filter').value;
    setFilterBy(newKeywordFilter);
    updatePopKeywordsBySearch(newKeywordFilter);
    renderImages();
    renderPopularKeywords();
}

function toggleMenu() {
    document.querySelector('.header-menu').classList.toggle('open');
    var elBtnOffCanvas = document.querySelector('.btn-offCanvas-menu');

    if (elBtnOffCanvas.innerText !== '<i class="fa fa-bars"></i>') {
        elBtnOffCanvas.innerText = 'X'; // להביא את התגית של איקס 
    } else {
        elBtnOffCanvas.innerText = '<i class="fa fa-bars"></i>';
    }
}

function translatePage() {
    var els = document.querySelectorAll('[data-trans]');
    for (var i = 0; i < els.length; i++) {
        var el = els[i];

        var transKey = el.getAttribute('data-trans');
        el.innerText = getTrans(transKey);
    }
}

function onSetLang(lang) {
    setLang(lang)
    if (lang === 'he') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
    translatePage();
}