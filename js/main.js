'use strict'



function initMain() {
    initCanvas()
    initMemeService()
    renderImages()
}


function renderImages() {
    var imgs = getImagesToDisplay()
    var strHTML = ''

    strHTML = imgs.map(function (img) {
        return `
        <div style="background-image:url(img/${img.id}.jpg)" class="item-img" onclick="onClickImage(${img.id})">
        </div>
        `
    }).join('')
    var elContainer = document.querySelector('.images-container')
    elContainer.innerHTML = strHTML
}


function onClickImage(id) {
    setMemeSelected(id)
    drawImageCanvas()
}