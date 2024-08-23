"use strict";

let prime_num = 0;

window.onload = function () {
    let hoge;
    let is_prime;

    hoge = 2;
    while (hoge <= 32) {
        is_prime = prime(hoge);
        if (is_prime == true) {
            document.write(hoge + "は素数<br/>");
        }
        hoge++;
    }
    document.write("素数は" + prime_num + "個ありました。<br/>");
}

function prime(num) {
    for (let i = 2; i < num; i++) {
        if (num % i == 0) {
            return false;
        }
    }
    prime_num++;
    return true;
}
