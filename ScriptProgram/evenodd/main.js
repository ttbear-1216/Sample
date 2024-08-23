"use strict";

window.onload = function () {
    let i;

    for (i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            document.write(i + "偶数<br/>");
        } else {
            document.write(i + "奇数<br/>");
        }

    }
}
