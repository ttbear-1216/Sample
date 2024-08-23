"use strict";
const SCREEN_WIDTH = 256; // スクリーンの幅
const SCREEN_HEIGHT = 256; // スクリーンの高さ
const OFFSET_X = 64; // 描画開始 X 座標
const FPS = 30;
let imgBlock = new Image();
let gaaField = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 2],
];
let mx, my;
// 初期化
function initialize() {
    imgBlock.src = "block.png";
    mx = 0;
    my = 0;
}
// 更新
function update() {
    my++;
    if (gaaField[my][mx] != 0) { // 衝突
        my--;
        gaaField[my][mx] = 1;
        mx = Math.floor(Math.random() * gaaField[0].length);
        my = 0;
        lineclear();
    }
    draw();
}
// 描画
function draw() {
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); // 画面をクリア
    // フィールド描画
    for (let y = 0; y < gaaField.length; y++) {
        for (let x = 0; x < gaaField[y].length; x++) {
            if (gaaField[y][x] != 0) {
                context.drawImage(imgBlock, 0, 0, 16, 16,
                    OFFSET_X + 16 * x, 16 * y, 16, 16);
            }
        }
    }
    // 落下ブロック描画
    context.drawImage(imgBlock, 0, 0, 16, 16, OFFSET_X + 16 * mx, 16 * my, 16, 16);
}

// ラインクリア
function lineclear() {
    let counter;
    // 下段から上段へ
    for (let y = gaaField.length - 2; y > 0; y--) {
        // 1 段が揃っているか調べるためにブロックの数を数える
        counter = 0;
        for (let x = 0; x < gaaField[y].length; x++) {
            if (gaaField[y][x] == 1) {
                counter++;
            }
        }
        // 揃っていたらそれより上の段を 1 段ずつ下におろす
        if (counter == gaaField[y].length) {
            for (let yy = y; yy >= 0; yy--) {
                for (let xx = 0; xx < gaaField[yy].length; xx++) {
                    if (yy == 0) {
                        gaaField[yy][xx] = 0;
                    } else {
                        gaaField[yy][xx] = gaaField[yy - 1][xx];
                    }
                }
            }
        }
    }
}