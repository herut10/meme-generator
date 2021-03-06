'use strict'

var gPrevMousePosition;
var gFonts = ['Impact', 'Arial', 'Times New Roman', 'Courier New', 'Verdana',
    'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black'
]
var gNumOfCols;
var gNumOfRows;
var gCurrOpenOffCanvas

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
        gNumOfCols = 1
    } else if (screenWidth < 840) {
        gNumOfCols = 2
    } else if (screenWidth < 1040) {
        gNumOfCols = 3
    } else if (screenWidth < 1200) {
        gNumOfCols = 4
    } else {
        gNumOfCols = 5
    }
    var hexagonNodes = document.querySelectorAll('.hexagon')
    gNumOfRows = Math.ceil(hexagonNodes.length / gNumOfCols)
    var elGrid = document.querySelector('.images-container')
    elGrid.style = `    
            grid-template-rows: repeat(${gNumOfRows}, 150px);
            grid-template-columns: repeat(${gNumOfCols}, 180px);`
    updateHexagonPosition()

}

function renderPopularKeywords() {
    var keywords = getPopularKeywords();
    var strHtml = '';
    strHtml = keywords.map(function (keyword) {
        return `<h1 style="font-size: ${map(keyword.count, 1, gTotalKeywordCount, 1, 4)}em">${keyword.keyword}</h1>`;
    }).join('');

    document.querySelector('.popular-Keywords-container').innerHTML = strHtml;
}

function renderImages() {
    var imgs = getImagesToDisplay();
    document.querySelector('.images-container').innerHTML = ''
    imgs.forEach(function (image, idx) {
        var img = new Image;
        img.src = image.url
        img.addEventListener("load", function () {
            var ratio = img.height / img.width
            console.log(ratio);

            document.querySelector('.images-container').innerHTML += `
        <div class="hexagon hexagon1">
            <div class="hexagon-in1 ">
                <div onmouseover="this.style='background-image:url(img/${image.id}.jpg); background-size: 400px ${400*ratio}px;' " style="background-image:url(img/${image.id}.jpg); background-size: 280px ${280*ratio}px;" onmouseout="this.style='background-image:url(img/${image.id}.jpg); background-size: 280px ${280*ratio}px;' " class="hexagon-in2 " onclick="onClickImage(${image.id})"></div>
            </div>
        </div>`
            setGridDimensions()
        });

    });
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
                                    <button class="btn btn-delete-text btn-delete-text-${newIdLine}" onclick="onDeleteText(event,'${newIdLine}')">
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
    var newKeywordFilter = document.querySelector('.select-keyword-filter').value;
    if (newKeywordFilter !== '') {
        document.querySelector('.select-keyword-filter').value = ''
        setFilterBy(newKeywordFilter);
        updatePopKeywordsBySearch(newKeywordFilter);
        renderImages();
        renderPopularKeywords();
        updateHexagonPosition()
    }
}

function toggleMenu() {
    document.querySelector('.header-menu').classList.toggle('open');
    var elBtnOffCanvas = document.querySelector('.btn-offCanvas-menu .fa')
    var elBtnOffCanvas = document.querySelector('.btn-offCanvas-menu .fa')
    elBtnOffCanvas.classList.toggle('fa-bars')
    elBtnOffCanvas.classList.toggle('fa-times')
}

function closeMenu() {

    document.querySelector('.header-menu').classList.remove('open')
    var elBtnOffCanvas = document.querySelector('.btn-offCanvas-menu .fa')
    var elBtnOffCanvas = document.querySelector('.btn-offCanvas-menu .fa')
    elBtnOffCanvas.classList.toggle('fa-bars')
    elBtnOffCanvas.classList.toggle('fa-times')

}


function translatePage() {
    var els = document.querySelectorAll('[data-trans]');
    for (var i = 0; i < els.length; i++) {
        var el = els[i];

        var transKey = el.getAttribute('data-trans');
        el.innerText = getTrans(transKey);
    }
    document.querySelector('.form-group input').placeholder=getTrans('SUBJECT')
    document.querySelector('.form-group textarea').placeholder=getTrans('BODY')
    document.querySelector('.select-keyword-filter').placeholder=getTrans('FILTER_PLACEHOLDER')
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
    if (offCanvas.classList.contains('open')) {
        offCanvas.classList.remove('open')
        if (txt !== gCurrOpenOffCanvas) {
            setTimeout(() => {
                offCanvas.classList.add('open')
                renderOffCanvasBody(txt)
            }, 500);
        }
    } else {
        renderOffCanvasBody(txt)
        offCanvas.classList.add('open')
    }
    gCurrOpenOffCanvas = txt
}

function renderOffCanvasBody(txt) { //this might look odd but if you add more header items it becomes more efficient and easy to maintain
    document.querySelector('.about').classList.add('none')
    document.querySelector('.contact').classList.add('none')
    document.querySelector(`.${txt}`).classList.remove('none')
}


function contact(subject, body) {
    document.querySelector('#body').value = '';
    document.querySelector('#subject').value = '';
    window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=yonaherut@gmail.com,idanhakim123@gmail.com&su=${subject}&body=${body} `,
        '_blank'
    );
}



// function onFileInputChange(ev) {
//     handleImageFromInput(ev, renderCanvas)
// }

// function renderCanvas(img) {
//     canvas.height = img.height;
//     ctx.drawImage(img, img.width, img.height);
// }

// function handleImageFromInput(ev, onImageReady) {
//     document.querySelector('.share-container').innerHTML = '';
//     var reader = new FileReader();
//     reader.onload = function (event) {
//         var img = new Image();
//         img.onload = onImageReady.bind(null, img);
//         img.src = event.target.result;
//     };
//     reader.readAsDataURL(ev.target.files[0]);
// }

// function onUploadImp(ev) {
//     ev.preventDefault();
//     console.log(ev);

//     ev.preventDefault();

//     document.getElementById('imgData').value = canvas.toDataURL('image/jpeg');

//     // A function to be called if request succeeds
//     function onSuccess(uploadedImgUrl) {
//         console.log('uploadedImgUrl', uploadedImgUrl);

//         uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
//         document.querySelector('.share-container').innerHTML = `
//         <a class="w-inline-block social-share-btn fb" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
//            Share   
//         </a>`;
//     }

//     doUploadImg(elForm, onSuccess);

// }

// function doUploadImg(elForm, onSuccess) {
//     var formData = new FormData(elForm);

//     fetch('http://ca-upload.com/here/upload.php', {
//             method: 'POST',
//             body: formData
//         })
//         .then(function (response) {
//             return response.text();
//         })
//         .then(onSuccess)
//         .catch(function (error) {
//             console.error(error);
//         });
// }
