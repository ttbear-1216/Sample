"use strict";
let canvas; // キャンバス
let context; // コンテキスト
let scaleRate; // 拡大率
window.onload = setup;
// グラフィック描画用キャンバスの設定
function setup() {
    canvas = document.createElement('canvas');
    canvas.width = SCREEN_WIDTH; // キャンバスのサイズを設定
    canvas.height = SCREEN_HEIGHT; // キャンバスのサイズを設定
    // キャンバスを引き伸ばし
    scaleRate = Math.min(window.innerWidth / SCREEN_WIDTH,
        window.innerHeight / SCREEN_HEIGHT);
    canvas.style.backgroundColor = 'black';
    canvas.style.width = SCREEN_WIDTH * scaleRate + 'px';
    canvas.style.height = SCREEN_HEIGHT * scaleRate + 'px';
    // キャンバスを配置する div 要素を作成し body に追加
    let container = document.createElement('div');
    container.style.width = window.innerWidth + 'px';
    container.style.height = window.innerHeight + 'px';
    container.style.overflow = 'hidden';
    container.appendChild(canvas);
    document.body.style.margin = '0';
    document.body.appendChild(container);
    context = canvas.getContext('2d'); // コンテキスト
    context.fillStyle = 'white'; // 塗り色
    context.strokeStyle = 'red'; // 線の色
    context.font = "24px 'Times New Roman'"; // 使用するフォント
    initialize();
    loop();
}
// ゲームループ
function loop() {
    update();
    setTimeout(loop, 1000 / FPS);
}
// キーボードイベント系
let aKeyState = [];
document.onkeydown = function (e) {
    aKeyState[e.code] = true;
}
document.onkeyup = function (e) {
    aKeyState[e.code] = false;
}
window.onblur = function () {
    aKeyState.length = 0; // 配列をクリアする
}
// キーボードが押されてる?
function keyGet(code) {
    return aKeyState[code];
}
// マウスイベント系
let mouse = {};
document.onmousemove = function (e) {
    mouse.x = e.clientX / scaleRate; // マウス座標取得
    mouse.y = e.clientY / scaleRate;
    mouse.move = true;
}
document.onmousedown = function (e) {
    if (e.buttons & 0x01) mouse.left = true;
    if (e.buttons & 0x02) mouse.right = true;
}
document.onmouseup = function (e) {
    if (!(e.buttons & 0x01)) mouse.left = false;
    if (!(e.buttons & 0x02)) mouse.right = false;
}