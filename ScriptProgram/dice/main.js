"use strict";

window.onload = function () {
    let hoge = 0;

    while (hoge != 2) {
        hoge = Math.floor(Math.random() * 6) + 1;
        document.write(hoge + "<br/>");
    }

}
