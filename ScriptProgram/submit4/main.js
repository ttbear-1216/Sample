"use strict";
// グローバル定数・変数
const SCREEN_WIDTH = 512; // スクリーンの幅
const SCREEN_HEIGHT = 512; // スクリーンの高さ
const FPS = 30; // フレームレート
let maptip0 = new Image();
let chara0 = new Image();
const MAPNAME = "desert"; // 読み込むマップ名
let frame = 0;
let aCharanm = [0, 1, 2, 1];
let work = {};
let aMapHit = [ // 当たり判定テーブル
    1, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 0, 0, 1, 1, 1,
    0, 0, 0, 0, 0, 1, 1, 1,
];
function initialize() {
    maptip0.src = "tmw_desert.png";
    chara0.src = "majo.png";
    work.myChara = {};
    work.myChara.x = 0;
    work.myChara.y = 0;
    work.myChara.dir = 0;
}
function update() {
    // キャラの移動前の座標を保持しておく
    let px = work.myChara.x;
    let py = work.myChara.y;
    // キャラクター移動
    if (keyGet("ArrowLeft")) {
        work.myChara.x -= 2;
        work.myChara.dir = 1;
    }
    if (keyGet("ArrowRight")) {
        work.myChara.x += 2;
        work.myChara.dir = 2;
    }
    if (keyGet("ArrowUp")) {
        work.myChara.y -= 2;
        work.myChara.dir = 3;
    }
    if (keyGet("ArrowDown")) {
        work.myChara.y += 2;
        work.myChara.dir = 0;
    }
    // マップとキャラの当たり判定
    let w = TileMaps[MAPNAME].width;
    let tw = TileMaps[MAPNAME].tilewidth;
    let th = TileMaps[MAPNAME].tileheight;
    let data = TileMaps[MAPNAME].layers[0].data;
    if (aMapHit[data[w * Math.floor(py / th)
        + Math.floor(work.myChara.x / tw)] - 1]
        || aMapHit[data[w * Math.floor(py / th)
        + Math.floor((work.myChara.x + 31) / tw)] - 1]
        || aMapHit[data[w * Math.floor((py + 31) / th)
        + Math.floor(work.myChara.x / tw)] - 1]
        || aMapHit[data[w * Math.floor((py + 31) / th)
        + Math.floor((work.myChara.x + 31) / tw)] - 1]) {
        work.myChara.x = px;
    }
    if (aMapHit[data[w * Math.floor(work.myChara.y / th)
        + Math.floor(work.myChara.x / tw)] - 1]
        || aMapHit[data[w * Math.floor(work.myChara.y / th)
        + Math.floor((work.myChara.x + 31) / tw)] - 1]
        || aMapHit[data[w * Math.floor((work.myChara.y + 31) / th)
        + Math.floor(work.myChara.x / tw)] - 1]
        || aMapHit[data[w * Math.floor((work.myChara.y + 31) / th)
        + Math.floor((work.myChara.x + 31) / tw)] - 1]) {
        work.myChara.y = py;
    }
    draw();
}
// フィールド描画
function draw() {
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); // 画面をクリア
    let map_w = TileMaps[MAPNAME].width;
    let map_h = TileMaps[MAPNAME].height;
    let tile_w = TileMaps[MAPNAME].tilewidth;
    let tile_h = TileMaps[MAPNAME].tileheight;
    let margin = 0;
    let spacing = 0;
    for (let y = 0; y < TileMaps[MAPNAME].height; y++) {
        for (let x = 0; x < TileMaps[MAPNAME].width; x++) {
            // 画面外は描画しない
            if (SCREEN_WIDTH / 2 - 16 - work.myChara.x + x * tile_w < -32) {
                continue; // continue は以降の処理を実行せず for に戻ります
            }
            if (SCREEN_HEIGHT / 2 - 16 - work.myChara.y + y * tile_h < -32) {
                continue;
            }
            if (SCREEN_WIDTH / 2 - 16 - work.myChara.x + x * tile_w >= SCREEN_WIDTH) {
                continue;
            }
            if (SCREEN_HEIGHT / 2 - 16 - work.myChara.y + y * tile_h >= SCREEN_HEIGHT) {
                continue;
            }
            // タイル描画
            let id = TileMaps[MAPNAME].layers[0].data[map_w * y + x] - 1;
            let sx = id % 8;
            let sy = Math.floor(id / 8);
            context.drawImage(maptip0,
                margin + (tile_w + spacing) * sx,
                margin + (tile_h + spacing) * sy,
                tile_w, tile_h,
                SCREEN_WIDTH / 2 - 16 - work.myChara.x + tile_w * x,
                SCREEN_HEIGHT / 2 - 16 - work.myChara.y + tile_h * y,
                tile_w, tile_h);
        }
    }
    // キャラ描画
    context.drawImage(chara0,
        aCharanm[Math.floor(frame / 8) % 4] * 32,
        work.myChara.dir * 32,
        32, 32,
        SCREEN_WIDTH / 2 - 16,
        SCREEN_HEIGHT / 2 - 16,
        32, 32);
    frame++;
}