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

function onInputText(idInput){
    var txt = document.querySelector(`.line-text-${idInput}`).value;
    var color = document.querySelector(`#color-text-${idInput}`).value;
    var size = document.querySelector(`.select-font-size-${idInput}`).value;
    
    if(idInput===getCountText()){
        // create
    }else{
        //update
    }
}


// function onDrawText(ev, idInput) {
//     console.log('onDrawText');
//     ev.stopPropagation(); //TODO do we need this?
    // var txt = document.querySelector(`.line-text-${idInput}`).value;
    // var color = document.querySelector(`#color-text-${idInput}`).value;
    // var size = document.querySelector('.select-font-size').value;

//     if (txt) {
//         console.log('add text');
//         console.log(txt);
//         if (!update) {
//             addNewText(txt, color, size);
//         } else {
//             updateText(txt, color, size,idInput)
//         }
//         drawTextLineCanvas(idInput);
//         onAddLineText()
//     }
// }



function onCloseEditor() {
    document.querySelector('.meme-editor').classList.add('hidden');
    document.querySelector('.image-chooser').classList.remove('hidden');
}

function onDownloadMeme() {

}

function onDeleteText(ev, idInput) {
    ev.stopPropagation();
    console.log('to delete text number: ', idInput);
}

function onAddLineText() {
    var countText = getCountText();

    var strHTML = ` <div class="add-line-menu flex">
                        <div class="selection-style-text">
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
                        </div>


                        <div class="btns-actions-${countText}">
                            <button class="btn btn-draw-text" onclick="onDrawText(event,${countText})">add text</button> 
                            <button class="btn btn-delete-text" onclick="onDeleteText(event,${countText})"><i class="fa fa-trash"></i></button>
                        </div>
                    </div>`;
    document.querySelector('.lines-edit').innerHTML += strHTML;
    updateInputElements();
}

function onChangekeywordFilter() {
    setFilterBy(document.querySelector('.select-keyword-filter').value);
}


// function updateInputElements() {
//     var meme = getGMeme()
//     var countText = getcountText();
//     meme.txts.forEach(function (txt, idx) {
//         document.querySelector(`.line-text-${idx}`).value = txt.line
//         if (idx !== countText - 1) {
//             document.querySelector(`.btns-actions-${idx}`).innerHTML = `
//         <button class="btn btn-update-text" onclick="onUpdateText(event,${idx},false)">update text</button> 
//         <button class="btn btn-delete-text" onclick="onDeleteText(event,${countText})"><i class="fa fa-trash"></i></button>
//         `
//         }
//     });
// }