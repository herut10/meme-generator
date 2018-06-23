var gCurrLocale = 'en';
var gTrans = {
    en: {
        SITE_TITLE: 'Meme Generator',
        LOGO:'Meme Generator',
        CONTACT:'Contact',
        ABOUT_US:'About Us',
        ALL:'All',
        POLITICAL:'Political',
        FUNNY:'Funny',
        NICE:'Nice',
        MOVIES:'Movies',
        TOYS:'Toys',
        TV:'Tv',
        SPORT: 'Sport',
        ANIMAL:'Animal',
        BABY:'Baby',
        BACK_TO_GALLERY:'Back to gallery',
        DOWNLOAD:'Download',
        FILTER:'Filter:',
        COPYRIGHT:'Copyright 2018 Idan&Herut.com'
        
        
    },
    he: {
        SITE_TITLE: 'מחולל מימים',
        LOGO:'מחולל מימים',
        CONTACT:'צור קשר',
        ABOUT_US:'לגבינו',
        FILTER:':פילטור',
        ALL:'הכל',
        Political:'פוליטי',
        FUNNY:'מצחיק',
        NICE:'נחמד',
        MOVIES:'סרטים',
        TOYS: 'צעצועים',
        TV:'טלוויזיה',
        SPORT:'ספורט',
        ANIMAL:'חיות',
        BABY:'תינוק',
        BACK_TO_GALLERY:'חזרה לגלריה',
        DOWNLOAD:'הורדה',
        COPYRIGHT:'Idan&Herut.com זכויות יוצרים 2018'
    }
};

function getTrans(transKey) {
    return gTrans[gCurrLocale][transKey];
}

function setLang(lang) {
    gCurrLocale = lang;
}

function getCurrLang() {
    return gCurrLocale;
}

function getParamFromURL(name) {
    var url = window.location.href;
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);
    if (!results) return null;
    var paramVal = results[2];
    return paramVal;
}
