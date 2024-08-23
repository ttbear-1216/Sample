"use strict";

window.onload = function () {
    const COIN = 838861;
    const PRICE = 20;
    let alpha = COIN * PRICE;
    let bravo = 2 ** 24;
    alpha = alpha % bravo;

    document.write("alpha:" + alpha + "<br/>");
    document.write("bravo:" + bravo + "<br/>");
}
