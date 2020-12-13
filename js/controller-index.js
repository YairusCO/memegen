'user strict'
var isInPage = true;
var gNum = 1;

function init() {
    render()
    console.log('init');
}

function Onload() {

    return load()
}

function onGallery() {
    isInPage = true;
    render();
}

function onEditor(num) {
    if (num > 0) {
        gNum = num;
    }
    isInPage = false;
    render();
}

function render() {
    if (isInPage) {
        var imgList = Onload() //getMemeForDisplay
        var strHtmls = '';
        strHtmls += imgList.map(function(img) {
            return `<div class="img" onclick="onEditor(${img.id})"><img src="${img.src}" alt=""></div>`
        }).join('');

        var elGallery = document.querySelector('.gallery');
        elGallery.innerHTML =
            `<!--<div class="top-container">
                        <div class="search">
                            <input type="search" id="site-search" name="q" aria-label="Search through site content">
                            <button onclick="search()">Search</button>
                        </div>

                        <div class="Popular-img"></div>
                    </div>-->
                    <div class="galleryList grid">
                ${strHtmls}
            </div>`;
    } else if (!isInPage) {
        var elGallery = document.querySelector('.gallery');
        elGallery.innerHTML =
            `<div class="editor-container main-layout flex justify-center">
                <div class="canvas-container">
                    <canvas id="my-canvas" onclick="onDraw(event)"></canvas>
                </div>
                <div class="input-container grid">
                <div class="id-1"> <input type="text" id="txt" name="txt" oninput="onInput(event)"></div>
                <div class="id-2"> <button onclick="onUpDown()"> <img class="img-btn" src="img/icon/up-and-down-opposite-double-arrows-side-by-side.png"> </button></div>
                <div class="id-3"><button onclick="onAddText()"><img class="img-btn" src="icon/add.png"> </button></div>
                <div class="id-4"> <button onclick="onSaveAndRestore()"><img class="img-btn" src="icon/restore.png" ></button></div>
                <div class="id-5"> <button onclick="onFontSize(1)"><img class="img-btn" src="icon/increase-font-icon.png"> </button></div>
                <div class="id-6"><button onclick="onFontSize(-1)"><img class="img-btn" src="icon/decrease-font-icon.png" ></button></div>
                <div class="id-7"><button onclick="onTextAlign('left')"><img  src="" ><img class="img-btn" src="icon/align-to-left.png" ></button></div>
                <div class="id-8"><button onclick="onTextAlign('center')"><img class="img-btn" src="icon/center-text-alignment.png" ></button></div>
                <div class="id-9"><button onclick="onTextAlign('right')"><img class="img-btn" src="icon/align-to-right.png" ></button></div>
                <div class="id-10"> <button onclick="onClearCanvas()"><img class="img-btn" src="icon/trash.png" ></button></div>
                <div class="id-11"> <button>  <a href="#"  onclick="onDownloadCanvas(this)" download=""><img class="img-btn" src="icon/download.png"> </a></button></div>
                </div>
            </div>`
        initC()
    }
}