"use strict";

//どこまで自乗を計算するかを表す定数。
const SQUARE_NUM = 10;

//自乗の計算結果を格納する配列変数
let gaSquare = [];

/**
 * メイン関数
 * はじめに実行されます
 */
window.onload = function () {
    squareCalc();
    squareDisp();
}

/**
 * 自乗の計算を行う。
 */
function squareCalc() {
    for (let i = 0; i < SQUARE_NUM; i++) {
        gaSquare[i] = i * i;
    }
}

/**
 * 自乗の計算結果を表示する。
 * グローバル変数gaSquareの内容を参照して表示する。
 */
function squareDisp() {
    for (let i = 0; i < SQUARE_NUM; i++) {
        document.write(`${gaSquare[i]}<br />`);
    }
}