"use strict";

window.onload = function () {
    const ZEIRITSU = 0.08;
    let nedan = 123;
    let zeikomi;

    zeikomi = (1 + ZEIRITSU) * nedan;

    document.write("税込み:" + zeikomi + "<br />");
    document.write("少数切り捨て:" + Math.floor(zeikomi) + "<br/>");
}
