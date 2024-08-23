"use strict";

/**
 * 連想配列monsterにモンスターのパラメーターを記憶し、内容をすべて表示する。
 */
window.onload = function () {
    let monster = {};

    monster["name"] = "クリマロン";
    monster["HP"] = 123;
    monster["atk"] = 10;
    monster["def"] = 20;

    for (let i in monster) {
        document.write(`key:${i} param:${monster[i]}<br/>`);
    }
}