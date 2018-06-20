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
    var txt = document.querySelector(".input-line-txt").value;
    if (txt) {
        console.log('add text');
        addNewText(txt);
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
    console.log('onAddLineText');
    ev.stopPropagation();

    
    var strHTML = ` <div class="add-line-menu flex" >
                        <input class="input-line-txt" type="text" placeholder="Enter text" required>
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
                        <select class="select-color">
                            <option value="black">Black</option>
                            <option value="white">White</option>
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                            <option value="yellow">Yellow</option>
                        </select>
                        <button class="btn btn-draw-text" onclick="onDrawText(event, 1)">add text</button>              
                    </div>`;
    document.querySelector('.lines-edit').innerHTML += strHTML;
}