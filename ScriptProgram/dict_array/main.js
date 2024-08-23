"use strict";

/**
 * 配列に連想配列を格納し、複数のモンスターパラメーターを1変数で管理。
 * 内容をすべて表示する。
 */
window.onload = function () {
    let aMonster = [];

    aMonster[0] = {};
    aMonster[0]["name"] = " クリマロン ";
    aMonster[0]["HP"] = 123;
    aMonster[0]["atk"] = 10;
    aMonster[0]["def"] = 20;
    aMonster[1] = {};
    aMonster[1]["name"] = " ピカ虫 ";
    aMonster[1]["HP"] = 100;
    aMonster[1]["atk"] = 1;
    aMonster[1]["def"] = 2;

    for (let i = 0; i < aMonster.length; i++) {
        for (let j in aMonster[i]) {
            document.write(`monster:${i} key:${j} param:${aMonster[i][j]}<br />`
            );
        }
    }
}