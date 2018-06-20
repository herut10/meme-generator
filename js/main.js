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
        return `<div style="background-image:url(img/${img.id}.jpg)" class="item-img" onclick="onClickImage(${img.id})">
                </div>`
    }).join('');
    document.querySelector('.images-container').innerHTML = strHTML;
}


function onClickImage(id) {
    document.querySelector('.meme-editor').classList.remove('hidden');
    document.querySelector('.image-chooser').classList.add('hidden');
    setMemeSelected(id)
    drawImageCanvas();
}

function onDrawText(ev, idInput) {
    console.log('onDrawText');
    ev.stopPropagation();
    var txt = document.querySelector(`.line-text-${idInput}`).value;
    var color = document.querySelector(`#color-text-${idInput}`).value;
    var size = document.querySelector('.select-font-size').value;

    if (txt) {
        console.log('add text');
        console.log(txt);
        addNewText(txt, color, size);
        drawTextLineCanvas(idInput);
    }
}

function onCloseEditor() {
    document.querySelector('.meme-editor').classList.add('hidden');
    document.querySelector('.image-chooser').classList.remove('hidden');
}

function onDownloadMeme() {

}

function onAddLineText(ev) {
    var countText = getcountText() + 1;

    var strHTML = ` <div class="add-line-menu flex" >
                        <input class="input-line-txt line-text-${countText}" type="text" placeholder="Enter text" required>
                        <select class="select-font-size">
                            <option value="10">10</option>
                            <option value="12">12</option>
                            <option value="14">14</option>
                            <option value="16">16</option>
                            <option value="18">18</option>
                            <option value="20">20</option>
                            <option value="22">22</option>
                            <option value="24">24</option>
                        </select>
                        <input type="color" id="color-text-${countText}" name="color" value="#ffffff" />
                        <button class="btn btn-draw-text" onclick="onDrawText(event,${countText})">add text</button>              
                    </div>`;
    document.querySelector('.lines-edit').innerHTML += strHTML;
}