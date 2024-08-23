"use strict";

window.onload = function () {
    let hoge;
    for (let i = 0; i <= 20; i++) {
        document.write(i + ":");
        hoge = factorail(i);
        document.write(hoge + "<br />");
    }
}

function factorail(num) {
    let answer = 1;
    for (let i = 2; i <= num; i++) {
        answer = i * answer;
    }
    return answer;
}
