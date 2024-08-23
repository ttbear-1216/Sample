"use strict";
const SCREEN_WIDTH = 512; // スクリーンの幅
const SCREEN_HEIGHT = 512; // スクリーンの高さ
const FPS = 30; // フレームレート
const MAP_WIDTH = 16; // マップの幅
let maptip0 = new Image();
let chara0 = new Image();
let frame = 0;
let work = {};
let aCharanm = [0, 1, 2, 1];
let aMap = [
    3, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 4,
    15, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 13,
    15, 29, 45, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 29, 13,
    15, 29, 29, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 30, 29, 13,
    15, 29, 30, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 29, 29, 13,
    15, 29, 29, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 30, 29, 13,
    15, 29, 30, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 29, 29, 13,
    15, 29, 29, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 30, 29, 13,
    15, 29, 30, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 29, 29, 13,
    15, 29, 29, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 30, 29, 13,
    15, 29, 30, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 29, 29, 13,
    15, 29, 29, 16, 17, 17, 17, 17, 17, 17, 17, 17, 18, 30, 29, 13,
    15, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 31, 29, 13,
    15, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 13,
    15, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 13,
    11, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 12,
];
function initialize() {
    maptip0.src = "tmw_desert.png";
    chara0.src = "majo.png";
    work.myChara = {};
    work.myChara.x = 0;
    work.myChara.y = 0;
    work.myChara.dir = 0;
}
// フィールド更新
function update() {
    // 移動前の座標を保存しておく
    let px = work.myChara.x;
    let py = work.myChara.y;
    // キャラクター移動
    if (keyGet('ArrowLeft')) {
        work.myChara.x -= 2;
        work.myChara.dir = 1;
    }
    if (keyGet('ArrowRight')) {
        work.myChara.x += 2;
        work.myChara.dir = 2;
    }
    if (keyGet('ArrowUp')) {
        work.myChara.y -= 2;
        work.myChara.dir = 3;
    }
    if (keyGet('ArrowDown')) {
        work.myChara.y += 2;
        work.myChara.dir = 0;
    }
    // 当たり判定
    if (aMap[MAP_WIDTH * Math.floor(py / 32)
        + Math.floor(work.myChara.x / 32)] == 30
        || aMap[MAP_WIDTH * Math.floor(py / 32)
        + Math.floor((work.myChara.x + 31) / 32)] == 30
        || aMap[MAP_WIDTH * Math.floor((py + 31) / 32)
        + Math.floor(work.myChara.x / 32)] == 30
        || aMap[MAP_WIDTH * Math.floor((py + 31) / 32)
        + Math.floor((work.myChara.x + 31) / 32)] == 30) {
        work.myChara.x = px;
    }
    if (aMap[MAP_WIDTH * Math.floor(work.myChara.y / 32)
        + Math.floor(work.myChara.x / 32)] == 30
        || aMap[MAP_WIDTH * Math.floor(work.myChara.y / 32)
        + Math.floor((work.myChara.x + 31) / 32)] == 30
        || aMap[MAP_WIDTH * Math.floor((work.myChara.y + 31) / 32)
        + Math.floor(work.myChara.x / 32)] == 30
        || aMap[MAP_WIDTH * Math.floor((work.myChara.y + 31) / 32)
        + Math.floor((work.myChara.x + 31) / 32)] == 30) {
        work.myChara.y = py;
    }
    draw(); // canvas を更新
}
// フィールド描画
function draw() {
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); // 画面をクリア
    // マップ描画
    for (let y = 0; y < aMap.length / MAP_WIDTH; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
            let sx = aMap[MAP_WIDTH * y + x] % 8;
            let sy = Math.floor(aMap[MAP_WIDTH * y + x] / 8);
            context.drawImage(maptip0, 32 * sx, 32 * sy, 32, 32,
                32 * x, 32 * y, 32, 32);
        }
    }
    // キャラ描画
    context.drawImage(chara0,
        aCharanm[Math.floor(frame / 8) % 4] * 32,

        work.myChara.dir * 32, 32, 32,
        work.myChara.x, work.myChara.y, 32, 32);

    frame++;
}