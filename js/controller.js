'user strict'


var txts = [];
var gCanvas = null;
var gCtx = null;
var gOffsetX;
var gOffsetY = 100;
var gCurrPlace = 0;
var gSizeFont = 60;
var gTextAlign = 'center'
var gIdTextSave = 1;
var lineMargin = 10;
// var gTags = [];

function initC() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas = document.getElementById('my-canvas');
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
    gOffsetX = gCanvas.width / 2;
    gCtx = gCanvas.getContext('2d');
    drawMeme();
}

function onInput() {
    drawMeme();
}


function drawUpTexts(tempTxts) {
    var txts = tempTxts.filter(function(txtData) {
        return txtData.place == 0;
    });

    var yOffset = 50;
    drawTexts(txts, yOffset);
}

function drawMiddleTexts(tempTxts) {
    var txts = tempTxts.filter(function(txtData) {
        return txtData.place == 1;
    });

    var totalSize = 0;
    txts.map(function(txt) {
        totalSize += txt.size;
    });

    totalSize += lineMargin * (txts.length - 1);
    var yOffset = (gCanvas.height / 2) - (totalSize / 2);
    drawTexts(txts, yOffset);
}


function drawBottomTexts(tempTxts) {
    var txts = tempTxts.filter(function(txtData) {
        return txtData.place == 2;
    });

    var totalSize = 0;
    txts.forEach(function(txt) {
        totalSize += txt.size;
    });

    totalSize += lineMargin * (txts.length - 1);
    var yOffset = gCanvas.height - 50 - totalSize;
    drawTexts(txts, yOffset);
}

function drawTexts(txts, yOffset) {
    for (var i = 0; i < txts.length; i++) {
        var txtData = txts[i];
        drawMemeText(txtData, yOffset);
        yOffset += txtData.size + lineMargin;
    }
}

function onImageLoaded(tempTxts) {


    drawUpTexts(tempTxts);
    drawMiddleTexts(tempTxts);
    drawBottomTexts(tempTxts);
}

function drawMeme() {

    var tempTxts = JSON.parse(JSON.stringify(txts));
    var currentTxtData = getCurrentTextData();
    if (currentTxtData.txt)
        tempTxts.push(currentTxtData);

    loadImage(tempTxts);
}

function getCurrentTextData() {
    return {
        txt: document.getElementById('txt').value,
        x: gOffsetX,
        place: gCurrPlace,
        font: 'impact',
        size: gSizeFont,
        align: gTextAlign
    }
}

function drawMemeText(txtData, offsetY) {
    gCtx.lineWidth = '1.5'
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = `${txtData.size}px impact`;
    gCtx.textAlign = txtData.align;
    gCtx.textBaseline = 'top';
    gCtx.fillText(txtData.txt, txtData.x, offsetY)
    gCtx.strokeText(txtData.txt, txtData.x, offsetY)
}

function loadImage(tempTxts) {
    var img = new Image()
    img.src = `img/meme-imgs/${gNum}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        onImageLoaded(tempTxts);
    }
}

function onAddText() {

    txts.push(getCurrentTextData());
    document.getElementById('txt').value = '';
}


function onUpDown() {
    gCurrPlace++;
    gCurrPlace = gCurrPlace % 3;
    drawMeme();
}

function onFontSize(num) {
    if (num > 0 && gSizeFont < 150) {
        gSizeFont = gSizeFont + 5;
    } else if (num < 0 && gSizeFont > 10) {
        gSizeFont = gSizeFont - 5;
    }

    drawMeme();
}

function onTextAlign(str) {
    switch (str) {
        case 'right':
            gTextAlign = 'right'
            gOffsetX = gCanvas.width - 10;
            break;
        case 'center':
            gTextAlign = 'center'
            gOffsetX = gCanvas.height / 2
            break;
        case 'left':
            gTextAlign = 'left'
            gOffsetX = 10;
            break;
    }

    drawMeme();
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    txts = [];
    drawMeme();
}

function onSaveAndRestore() {
    txts.pop()
    drawMeme();
}


















// setTag()
// search()

// function search() {
//     // var elTag = document.getElementById('site-search').value;
//     var elTag = 'people';
//     console.log(gTags);
//     var tag = gTags.filter(function(item) {
//         return item.name === elTag;
//     });
//     console.log(tag);
//     // var totalSize = 0;
//     // tag.map(function(txt) {

//     // });


//     // var  document.querySelector('');
//     // .innerHTML =
// }

// function setTag() {
//     //people, animal, dog,cat, fany, kids, movie

//     gTags = [{
//             name: 'people',
//             rate: 10,
//             ids: [1, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13]
//         },
//         {
//             name: 'animal',
//             rate: 3,
//             ids: [2, 3, 4]
//         },
//         {
//             name: 'dog',
//             rate: 2,
//             ids: [2, 3]
//         },
//         {
//             name: 'cat',
//             rate: 1,
//             ids: [4]
//         },
//         {
//             name: 'fany',
//             rate: 4,
//             ids: [7, 8, 9, 10]
//         },
//         {
//             name: 'kids',
//             rate: 4,
//             ids: [3, 5, 7, 9]
//         },
//         {
//             name: 'love',
//             rate: 3,
//             ids: [2, 3, 11]
//         },
//         {
//             name: 'movie',
//             rate: 6,
//             ids: [6, 7, 11, 12, 13, 14]
//         },
//     ]
// }