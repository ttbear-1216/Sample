"use strict";
const SCREEN_WIDTH = 640; // スクリーンの幅
const SCREEN_HEIGHT = 480; // スクリーンの高さ
const FPS = 30; // フレームレート
let work = {}; // ワーク用グローバル連想配列
// ゲーム初期化
function initialize() {
    // 位置を画面の中央に
    work.x = SCREEN_WIDTH / 2;
    work.y = SCREEN_HEIGHT / 2;
    // 移動方向を右下方向に
    work.sx = 1;
    work.sy = 1;
}
// フィールド更新
function update() {
    // ボール移動
    work.x += work.sx;
    work.y += work.sy;
    // 壁に当たったら跳ね返る処理
    if (work.x <= 0 || work.x >= SCREEN_WIDTH - 1) work.sx *= -1;
    if (work.y <= 0 || work.y >= SCREEN_HEIGHT - 1) work.sy *= -1;
    draw(); // canvas を更新
}
// フィールド描画
function draw() {
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); // 画面をクリア
    context.fillRect(work.x - 3, work.y - 3, 7, 7); // ボールを描画
}