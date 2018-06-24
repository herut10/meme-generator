'use strict'

var gPrevMousePosition;
var gFonts = ['Impact', 'Arial', 'Times New Roman', 'Courier New', 'Verdana',
    'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black'
]
var gNumOfCols;
var gNumOfRows;

function initMain() {
    initCanvas();
    initMemeService();
    renderImages();
    renderPopularKeywords();
    setGridDimensions()
    updateHexagonPosition()
}

function setGridDimensions() {
    var screenWidth = window.innerWidth
    if (screenWidth < 570) {
        gNumOfCols = 1
    } else if (screenWidth < 630) {
        gNumOfCols = 2
    } else if (screenWidth < 840) {
        gNumOfCols = 3
    } else if (screenWidth < 1040) {
        gNumOfCols = 4
    } else if (screenWidth < 1200) {
        gNumOfCols = 5
    } else {
        gNumOfCols = 5
    }
    var hexagonNodes = document.querySelectorAll('.hexagon')
    gNumOfRows = Math.ceil(hexagonNodes.length / gNumOfCols)
    var elGrid = document.querySelector('.images-container')
    elGrid.style = `    
            grid-template-rows: repeat(${gNumOfRows}, 150px);
            grid-template-columns: repeat(${gNumOfCols}, 180px);`

}

function renderPopularKeywords() {
    var keywords = getPopularKeywords();
    var strHtml = '';
    strHtml = keywords.map(function (keyword) {
        return `<h1 style="font-size: ${map(keyword.count, 1, gTotalKeywordCount, 0.5, 4)}em">${keyword.keyword}</h1>`;
    }).join('');

    document.querySelector('.popular-Keywords-container').innerHTML = strHtml;
}

function renderImages() {
    var imgs = getImagesToDisplay();
    var strHtml = '';

    strHtml = imgs.map(function (img) {
        return `
        <div class="hexagon hexagon1">
            <div class="hexagon-in1 ">
                <div style="background-image:url(img/${img.id}.jpg)" class="hexagon-in2 " onclick="onClickImage(${img.id})"></div>
            </div>
        </div>`
    }).join('');
    var elGrid = document.querySelector('.images-container').innerHTML = strHtml;
    setGridDimensions()
}


function updateHexagonPosition() {
    var hexagonNodes = document.querySelectorAll('.hexagon')

    for (var i = 0; i < Math.ceil(hexagonNodes.length / gNumOfCols); i++) {
        for (var j = 0; j < gNumOfCols; j++) {
            if (hexagonNodes[2 * i * gNumOfCols + j + gNumOfCols]) {
                hexagonNodes[2 * i * gNumOfCols + j + gNumOfCols].style = `        
            position: relative;
            right: -100px;`
            }
        }

    }

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
        if (getGMeme().txts.length === 4) {
            onAddLineText();
        }
    }
}

function onTextClick(ev) {
    gPrevMousePosition = mousePos(ev)
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
        var mousePosXDiff = mouseposition.x - gPrevMousePosition.x
        var mousePosYDiff = mouseposition.y - gPrevMousePosition.y
        gPrevMousePosition = mouseposition
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
    if (getGMeme().txts.length < 5) {
        var strHTML = `    <div class="new-text">
                                <div class="selection-style-text flex animated bounceInRight">
                                    <input class="input-line-txt line-text-${newIdLine}" onkeyup="onChangeStyleText('${newIdLine}')" type="text" placeholder="Enter text" required>
                                    <button class="btn btn-delete-text-${newIdLine}" onclick="onDeleteText(event,'${newIdLine}')">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </div>
                                <div class="btns-actions-text animated bounceInRight">
                                    <button class="btn btn-increase-size" onclick="onChangeSize(event,'${newIdLine}',1)"><i class="fa fa-font"></i><i class="fa fa-arrow-up"></i></button>
                                    <button class="btn btn-decrease-size" onclick="onChangeSize(event,'${newIdLine}',-1)"><i class="fa fa-font"></i><i class="fa fa-arrow-down"></i></button>
                                    <button class="btn btn-bold btn-bold-${newIdLine}" onclick="onBoldText(event,'${newIdLine}')"><i class="fa fa-bold bold-select"></i></button>
                                    <button class="btn btn-shadow btn-shadow-${newIdLine}" onclick="onShadowText(event,'${newIdLine}')">s</button>
                                    <input class="input-color" onchange="onChangeStyleText('${newIdLine}')" type="color" id="color-text-${newIdLine}" name="color" value="#ffffff"  />${makeFontSelect(newIdLine)}
                                </div>
                            </div>`;


        var node = document.createElement("div");
        node.classList.add('add-line-menu', `add-line-menu-${newIdLine}`, 'flex');
        node.innerHTML = strHTML;
        document.querySelector(".lines-edit").appendChild(node);
    }
}

function onFontChange(id, font) {
    setTextFont(id, font)
    drawCanvas()
}

function makeFontSelect(newIdLine) {
    var resHTML = `<select class="input-font-text" onchange="onFontChange('${newIdLine}',this.value)" name="fonts">`
    var strHTMLs = gFonts.map(function (font) {
        return `<option value="${font}">${font}</option>`
    }).join('')
    resHTML += strHTMLs
    resHTML += '</select>'
    return resHTML
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

function onChangeKeywordFilter(ev) {
    ev.preventDefault();
    var newKeywordFilter = document.querySelector('.select-keyword-filter1').value;
    if (newKeywordFilter !== '') {
        document.querySelector('.select-keyword-filter1').value = ''
        setFilterBy(newKeywordFilter);
        updatePopKeywordsBySearch(newKeywordFilter);
        renderImages();
        renderPopularKeywords();
        updateHexagonPosition()
    }
}

function toggleMenu() {
    document.querySelector('.header-menu').classList.toggle('open');
    var elBtnOffCanvas = document.querySelector('.btn-offCanvas-menu .fa').toggle('fa-bars')
    var elBtnOffCanvas = document.querySelector('.btn-offCanvas-menu .fa').toggle('fa-times')


    if (elBtnOffCanvas.innerText !== '<i class="fa fa-bars"></i>') {
        elBtnOffCanvas.innerHTML = '<i class="fa fa-times"></i>'; // להביא את התגית של איקס 
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

function toggleOffCanvas(txt) {
    // Get the modal
    var offCanvas = document.querySelector('.offCanvas');
    if (txt === 'contact') {
        offCanvas.innerHTML = `
        <div class="offCanvas-content flex column">

        <h1>Get In Touch</h1>
        <h2>In order to get in touch use the contact form below:</h2>
        <form class="flex column">
            <div class="form-group flex align-center">
                <input type="text" class="form-control" id="subject" placeholder="subject">
            </div>
            <div class="form-group flex align-center">
                <textarea class="form-control" id="body" rows="3" placeholder="Write your message here..."></textarea>
            </div>
            <button type="button" class="btn btn-submit" onclick="contact(subject.value,body.value)">Submit</button>
        </form>
    </div>
        `
    }
    offCanvas.classList.toggle('open')
}

function renderContactModal() {
    document.querySelector('.modal-header').innerHTML =
        `
    <span class="close">&times;</span>
    <h1>Get In Touch</h1>    
    `
}

function contact(subject, body) {
    window.location = `https://mail.google.com/mail/?view=cm&fs=1&to=yonaherut@gmail.com&su=${subject}&body=${body} `
}