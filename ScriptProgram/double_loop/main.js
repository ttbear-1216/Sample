"use strict";

window.onload = function () {
    let i;
    let j;

    for (i = 1; i < 10; i++) {
        for (j = 1; j < 10; j++) {
            if (i == 5 && j == 5) {
                document.write("(" + i + j + ")");
            } else {
                document.write(i * j + "");
            }
            if (j == 9) {
                document.write("<br/>");
            }
        }

    }
}
