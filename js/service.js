'user strict'
const KEY = 'imgList'
var gImgList = [];
doImgList()

function doImgList() {
    for (var i = 1; i < 16; i++) {
        var img = {
            id: i,
            src: `img/meme-imgs/${i}.jpg`
        }
        gImgList.push(img);
    }
}
console.log(gImgList);
saveToStorage(KEY, gImgList)

function load() {

    return loadFromStorage(KEY)
}