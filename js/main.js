'use strict'

function initMain() {
    initCanvas();
    initMemeService();
    renderImages();
}

function renderImages() {
    var imgs = getImagesToDisplay();
    var strHTML = '';

    strHTML = imgs.map(function (img) {
        return `<div style="background-image:url(/img/${img.id}.jpg)" class="item-img" onclick="onClickImage(${img.id})">
                </div>`
    }).join('');
    document.querySelector('.images-container').innerHTML = strHTML;
}


function onClickImage(id) {
    document.querySelector('.meme-editor').classList.remove('hidden');
    document.querySelector('.image-chooser').classList.add('hidden');
    setMemeSelected(id)
    drawImageCanvas();
    onAddLineText();
}

function onChangeStyleText(idInput) {
    var txt = document.querySelector(`.line-text-${idInput}`).value;
    var color = document.querySelector(`#color-text-${idInput}`).value;
    var size = document.querySelector(`.select-font-size-${idInput}`).value;

    if (idInput === getCountText()) {
        addNewText(txt, color, size);
        onAddLineText();
    } else {
        updateText(txt, color, size, idInput);
    }
    drawTextLineCanvas(idInput);
}


function onCloseEditor() {
    document.querySelector('.meme-editor').classList.add('hidden');
    document.querySelector('.image-chooser').classList.remove('hidden');
}

function onDownloadMeme() {

}

function onDeleteText(ev, idInput) {
    ev.stopPropagation();

    if (isValidToRemove(idInput)) {
        console.log('to delete text number: ', idInput);
        removeLineFromMeme(idInput);
        var nodeToRemove = document.querySelector(`.add-line-menu-${idInput}`);
        document.querySelector(".lines-edit").removeChild(nodeToRemove);

        for (let i = idInput +1; i < array.length; i++) {
            const element = array[i];
            
        }
    }
}

function onAddLineText() {
    var countText = getCountText();

    var strHTML = `
                        <div class="selection-style-text">
                            <input class="input-line-txt line-text-${countText}" onkeyup="onChangeStyleText(${countText})" type="text" placeholder="Enter text" required>
                            <select onchange="onChangeStyleText(${countText})" class="select-font-size-${countText}">
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="14">14</option>
                                <option value="16">16</option>
                                <option value="18">18</option>
                                <option value="20">20</option>
                                <option value="22">22</option>
                                <option value="24">24</option>
                            </select>
                            <input onchange="onChangeStyleText(${countText})" type="color" id="color-text-${countText}" name="color" value="#ffffff" />
                        </div>
                        <div class="btns-actions-text">
                            <button class="btn btn-delete-text-${countText}" onclick="onDeleteText(event,${countText})">
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>`;

    var node = document.createElement("div");
    node.classList.add('add-line-menu', `add-line-menu-${countText}`, 'flex');
    node.innerHTML = strHTML;
    document.querySelector(".lines-edit").appendChild(node);
}

function onChangekeywordFilter() {
    setFilterBy(document.querySelector('.select-keyword-filter').value);
}