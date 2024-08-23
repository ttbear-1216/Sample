"use strict";
const SCREEN_WIDTH = 512; // スクリーンの幅
const SCREEN_HEIGHT = 512; // スクリーンの高さ
const FPS = 10; // フレームレート
let image0 = new Image(); // イメージオブジェクト
let image1 = new Image(); // イメージオブジェクト
let frame = 0; // フレームカウンタ
// 初期設定
function initialize() {
    image0.src = "pipo_coin001.png"; // 画像読み込み
    image1.src = "majo.png"; // 画像読み込み
}
// 更新
function update() {
    draw();
}
// 描画
function draw() {
    let sx = frame % 5 * 200;
    let sy = Math.floor(frame / 5) % 2 * 200;
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); // 画面クリア
    context.drawImage(image0, sx, sy, 200, 200, 0, 0, 100, 100); // 画像描画
    context.fillText("frame:" + frame, 0, 128);
    context.fillText(`sx:${sx}`, 0, 128 + 32);
    context.fillText(`sy:${sy}`, 0, 128 + 64);

    //魔女
    let anime_table = [0, 1, 2, 1];
    let mx = anime_table[frame % 4] * 32;
    context.drawImage(image1, mx, 0, 32, 32, 120, 16, 64, 64); // 画像描画
    context.fillText(`mx:${mx}`, 128, 128);

    frame++;
}