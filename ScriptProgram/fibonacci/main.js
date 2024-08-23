"use strict";

window.onload = function () {
    let hoge;
    for (let i = 0; i <= 20; i++) {
        document.write(i + ":");
        let hoge = fibonacci(i);
        document.write(hoge + "<br />");
    }
}

function fibonacci(num) {
    if (num <= 1) {
        return num;
    }
    let a = 0, b = 1, temp;
    for (let i = 2; i <= num; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}