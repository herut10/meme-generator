var gCurrLocale = 'en';
var gTrans = {
    en: {
        SITE_TITLE: 'Meme Generator',
        LOGO: 'Meme Generator',
        CONTACT: 'Contact',
        ABOUT_US: 'About Us',
        ALL: 'All',
        POLITICAL: 'Political',
        FUNNY: 'Funny',
        NICE: 'Nice',
        MOVIES: 'Movies',
        TOYS: 'Toys',
        TV: 'Tv',
        SPORT: 'Sport',
        ANIMAL: 'Animal',
        BABY: 'Baby',
        BACK_TO_GALLERY: 'Back to gallery',
        DOWNLOAD: 'Download',
        FILTER: 'Filter:',
        COPYRIGHT: 'Copyright 2018 Idan&Herut.com',
        SEARCH: 'Search',
        TOUCH_HEADER: 'Get In Touch',
        TOUCH_SUB_HEADER: 'In order to get in touch use the contact form below:',
        SUBMIT: 'Submit',
        ABOUT_US_BODY: 'Herut and Idan are two handsome programmers on the way to becoming fullstack developers.',
        SUBJECT: 'Subject',
        BODY: 'Write your message here...',
        FILTER_PLACEHOLDER: 'Enter text'
    },
    he: {
        SITE_TITLE: 'מחולל מימים',
        LOGO: 'מחולל מימים',
        CONTACT: 'צור קשר',
        ABOUT_US: 'לגבינו',
        FILTER: ':פילטור',
        ALL: 'הכל',
        POLITICAL: 'פוליטי',
        FUNNY: 'מצחיק',
        NICE: 'נחמד',
        MOVIES: 'סרטים',
        TOYS: 'צעצועים',
        TV: 'טלוויזיה',
        SPORT: 'ספורט',
        ANIMAL: 'חיות',
        BABY: 'תינוק',
        BACK_TO_GALLERY: 'חזרה לגלריה',
        DOWNLOAD: 'הורדה',
        COPYRIGHT: 'Idan&Herut.com זכויות יוצרים 2018',
        SEARCH: 'חפש',
        TOUCH_HEADER: 'צור איתנו קשר',
        TOUCH_SUB_HEADER: 'על מנת ליצור קשר איתנו אנא מלאו את הטופס:',
        SUBMIT: 'שלח',
        ABOUT_US_BODY: '.חרות ועידן הם שני מתכנתים חתיכים בדרכם להיות מפתחי פולסטאק לעתיד',
        SUBJECT: 'נושא',
        BODY: 'רשום את הודעתך כאן...',
        FILTER_PLACEHOLDER: 'הכנס טקסט'
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